var express = require('express'),
  router = express.Router(),
  UserKeys = require('../models/user_keys'),
  BitAuth = require('bitauth');

module.exports = function (app) {
  app.use('/', router);
};

var sendUnauthorized = function (res) {
  return res.send(401, {
    message: 'Unauthorized', error:
    {
      stack: ''
    }
  });
};

router.get('/auth', function (req, res) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.setHeader('Content-Type', 'application/json');
  var users = new UserKeys().Users;
  var pubKey = req.get('x-identity')
  var sign = req.get('x-signature');
  var sin = BitAuth.getSinFromPublicKey(pubKey);
  BitAuth.verifySignature({ data: 'Sample Data' }.toString(), pubKey, sign, function (success, err) {   
    console.log(err)
    if (!sin || !users[sin]) {
      return sendUnauthorized(res);
    }
    res.send(200, JSON.stringify({ users: users }));
  });
  return sendUnauthorized(res);
});

router.get('/', function (req, res) {
  res.render('index', {
    title: 'Passwordless login with BitAuth',
    scripts: ['client.js'],
    articles: {}
  });
});
