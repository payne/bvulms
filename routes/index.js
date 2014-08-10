var indexCtrl =  require('../controllers/index');

module.exports = function(app) {
    app.get('/', indexCtrl.index);
    app.get('/spa', indexCtrl.spa);
    app.get('/about', indexCtrl.about);
};
