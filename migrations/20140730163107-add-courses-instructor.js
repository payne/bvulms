var dbm = require('db-migrate');
var type = dbm.dataType;

exports.up = function(db, callback) {
    db.addColumn('courses', 'instructor_id', { type: 'int' }, callback);
};

exports.down = function(db, callback) {
    db.removeColumn('courses', 'instructor_id', callback);
};
