var conf = require('../database.json');
var env = 'dev';

module.exports.query = function() {
    var q = require('pg-query');
    q.connectionParameters = process.env.DATABASE_URL ||
                            'postgres://' + conf[env].user + ':' + conf[env].password + '@'
                            + conf[env].host + '/' + conf[env].database;
    return q;
};
