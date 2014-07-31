var indexCtrl =  require('../controllers/index');

module.exports = function(app) {
    app.get('/', indexCtrl.index);
    app.get('/about', indexCtrl.about);
};
