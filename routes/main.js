//var express = require('express');

module.exports = function(app) {
    require('./index')(app);
    require('./courses')(app);
};
