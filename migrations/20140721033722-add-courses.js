var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.createTable('courses', {
        id: { type: 'int', primaryKey: true, autoIncrement: true },
        prefix: 'string',
        title: 'string'
    }, callback);
};

exports.down = function(db, callback) {
    db.dropTable('courses', callback);
};
