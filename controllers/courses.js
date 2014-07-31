// FIXME This code is getting super messy!
// Time for services, a factory for instantiating them (instead of require('../services...')
// bleh!), connection parameters from database.json, and possibly a seemless
// 'row'-to-JSobject utility class.
//
// I think I missed Web architecture....
//
// FIXME
// It would be really cool if I could write a utility that consults
// $PROJECT/databason.json for the connectionParameters.
// I should probably also look at how environment variables are typically used
// so that I'm not checking in files that contain DB urls and password to GitHub.
pushSampleData = function(arr) {
    arr.push( { id: 1, prefix: '0BVU 001', title: 'Summer Camp 1' } );
    arr.push( { id: 2, prefix: '0BVU 002', title: 'Summer Camp 2' } );
    arr.push( { id: 3, prefix: '0BVU 003', title: 'Empowerment' } );
};

barf = function(res, msg, err) {
    console.error(msg, err);
    res.render('../views/error', { error: err, message: msg });
};

module.exports.add_form = function(req, res) {
    res.render('../views/courses/add-form');
}

module.exports.add = function(req, res) {
    query = require('pg-query');
    query.connectionParameters = "postgres://postgres:******@localhost/bvulms";
    console.log('Trying to insert ' + req.body.prefix + ' ' + req.body.title + ' into database');
    query('insert into courses (prefix, title) values ($1, $2) returning id',
          [req.body.prefix, req.body.title ], function(err, result) {
        if (err) {        
            barf(res, 'error running query', err);
            return;
        }
/*
        if (result) {
            var newId = result.rows[0].id;
            res.send('it worked! id = ' + newId);
        } else {
*/
            //res.send('it worked!');
        res.redirect('/courses');
        //}
    });
}

module.exports.list = function(req, res) {
    query = require('pg-query');
    query.connectionParameters = "postgres://postgres:******@localhost/bvulms";
    query('select id, prefix, title from courses', function(err, rows, result) {
        var rs = [];
        if (err) {
            barf(res, 'error running query', err);
            return;
        }
        rows.forEach( function(row) {
            rs.push( { id: row.id, prefix: row.prefix, title: row.title } );
        } );
        // Must do the render inside my callback function since it is invoked async.
        res.render('../views/courses/index', { courses: rs });
    });
};

module.exports.detail = function(req, res) {
    if (req.params.course_id) {
        query = require('pg-query');
        query.connectionParameters = "postgres://postgres:******@localhost/bvulms";
        query('select prefix, title, users.name as instructor_name from courses, users where courses.id = $1 and courses.instructor_id = users.id', [req.params.course_id], function(err, rows, result) {
            if (rows.length == 1) {
                var course = { id: req.params.course_id, prefix: rows[0].prefix, title: rows[0].title, instructor_name: rows[0].instructor_name };
                res.render('../views/courses/detail', { course: course });
            } else {
                res.render('../views/courses/detail', { course: { id: 0, prefix: '000 000', title: 'None', instructor_name: 'None' } } );
            }
        });
    } else {
        // FIXME This should be some kind of error page.
        res.render('../views/courses/detail', { course: { id: 0, prefix: '000 000', title: 'None' } } );
    }
};

module.exports.index = function(req, res) {
    list(req, res);
};


/*
// From https://www.npmjs.org/package/pg
    // Use pg module to load data into an array of objects, then pass it to view.
    var pg = require('pg');
    var conString = "postgres://postgres:******@localhost/bvulms";
    rs = []
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('select id, prefix, title from courses', function(err, result) {
            //call `done()` to release the client back to the pool
            done();

            if (err) {
                return console.error('error running query', err);
            }
            //console.log("# results: " + result.rows.length);
            result.rows.forEach( function(row) {
                //console.log("processing one row");
                rs.push( { id: row.id, prefix: row.prefix, title: row.title } );
                //console.log("rs is now " + rs);
            } );
            console.log("exiting query block, rs is " + rs);
        });
        //console.log("exiting connect block, rs is " + rs);
    });

    console.log("and now sending " + rs);
*/

/*
    query = require('pg-query');
    console.log( query.connectionParameters );
    query('select id, prefix, title from courses', function(err, rows, result) {
        if (err) {
            return console.error('error running query', err);
        }
        rows.forEach( function(row) {
            //console.log("processing one row");
            rs.push( { id: row.id, prefix: row.prefix, title: row.title } );
            //console.log("rs is now " + rs);
        } );
    });
*/
/*
    var pg = require('pg');
    var conString = "postgres://postgres:******@localhost/bvulms";
    var rs = [];
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        var query = client.query('select id, prefix, title from courses');
        query.on('row', function(row) {
            console.log('row: ' + row);
            rs.push( { id: row.id, prefix: row.prefix, title: row.title } );
            console.log("rs is now " + rs);
        });
        query.on('end', function(result) {
            console.log(result.rowCount + ' rows/records were received');
        });
        console.log("HEY!!!  rs is finally " + rs);
        res.render('../views/courses/index', { courses: rs });
    });
*/
