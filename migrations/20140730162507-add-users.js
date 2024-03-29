var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('users', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        login: 'string',
        password: 'string',
        name: 'string',
        type: 'string'
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('users', callback);
};
