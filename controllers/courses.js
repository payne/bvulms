barf = function(res, msg, err) {
    if (!err) {
        err = { status: '', stack: '' };
    }
    console.error(msg, err);
    res.render('../views/error', { error: err, message: msg });
};

module.exports.add_form = function(req, res) {
    res.render('../views/courses/add-form');
}

module.exports.add = function(req, res) {
    query = require('../models/db-util.js').query();
    query('insert into courses (prefix, title) values ($1, $2) returning id',
          [req.body.prefix, req.body.title ], function(err, result) {
        if (err) {        
            barf(res, 'error running query', err);
            return;
        }
        res.redirect('/courses');
    });
}

module.exports.list = function(req, res) {
    query = require('../models/db-util.js').query();
    query('select id, prefix, title from courses', function(err, rows, result) {
        var rs = [];
        if (err) {
            barf(res, 'error running query', err);
            return;
        }
        rows.forEach( function(row) {
            rs.push( { id: row.id, prefix: row.prefix, title: row.title } );
        } );
        res.render('../views/courses/index', { courses: rs });
    });
};

// FIXME
// With this we will build an Angular portion to the site.
// We will have a list of courses with a search box that dynamically filters.
// It will autoload the data using Angular's $http service, through which it
// will call this route.
module.exports.listJson = function(req, res) {
    query = require('../models/db-util.js').query();
    query('select id, prefix, title from courses', function(err, rows, result) {
        var rs = [];
        if (err) {
            barf(res, 'error running query', err);
            return;
        }
        rows.forEach( function(row) {
            rs.push( { id: row.id, prefix: row.prefix, title: row.title } );
        } );
        res.send( JSON.stringify(rs) );
    });
};

// FIXME: check that req.params.course_id is numeric ...
//          either do this as a regex in routes/courses.js or do it 
//          at  if (rows.length == 1)  below.
module.exports.detail = function(req, res) {
    if (req.params.course_id) {
        query = require('../models/db-util.js').query();
        query('select prefix, title, users.name as instructor_name from courses, users where courses.id = $1 and courses.instructor_id = users.id', [req.params.course_id], function(err, rows, result) {
            if (rows.length == 1) {
                var course = { id: req.params.course_id, prefix: rows[0].prefix, title: rows[0].title, instructor_name: rows[0].instructor_name };
                res.render('../views/courses/detail', { course: course });
            } else {
                barf(res, 'Course not found', { 'status': 'requested id = ' + req.params.course_id,
                                                'stack': '' });
            }
        });
    } else {
        barf(res, 'No course ID specified', null);
    }
};

module.exports.index = function(req, res) {
    list(req, res);
};


