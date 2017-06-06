'use strict';
import BitAuth from 'bitauth';
import request from 'request';

const getUsers = () => {
    // can be generated using BitAuth.generateSin().priv
    const keys = {
        user1: '38f93bdda21a5c4a7bae4eb75bb7811cbc3eb627176805c1009ff2099263c6ad'
    };
    var options = {
        method: 'GET',
        url: 'http://localhost:3000/auth',
        headers: {
            'cache-control': 'no-cache',
            'x-identity': BitAuth.getPublicKeyFromPrivateKey(keys.user1),
            'x-signature': BitAuth.sign({ data: 'Sample Data' }.toString(), keys.user1)
        }
    };
    request(options, function (error, response, body) {
        if (error) { throw new Error(error); }
        if (body) {
            document.getElementById('users').innerHTML = JSON.stringify(JSON.parse(body).users);
        }
    });

};

const registerEvents = () => {
    document.getElementById('btnGetUsers').onclick = getUsers;
};

document.addEventListener('load', registerEvents(), false);

