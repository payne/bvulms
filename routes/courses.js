var coursesCtrl =  require('../controllers/courses');

module.exports = function(app) {
    app.get('/courses/index', coursesCtrl.list);
    app.get('/courses/list', coursesCtrl.list);
    app.post('/courses/add', coursesCtrl.add);
    app.get('/courses/add-form', coursesCtrl.add_form);
    app.get('/courses/:course_id', coursesCtrl.detail);
    app.get('/courses', coursesCtrl.list);
};
