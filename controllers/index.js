module.exports.index = function(req, res) {
    console.log('trying to render ../views/index');
    res.render('../views/index/index', { 'title': 'My App' });
};

module.exports.spa = function(req, res) {
    console.log('trying to render the Single Page Application (SPA)');
    res.render('../views/spa');
};

module.exports.about = function(req, res) {
    res.send("About us...");
};
