'use strict';
var app = require('angular').module('angular-application');

app.controller('HomeController', require('./home'));
app.controller('AboutController', require('./about'));
app.controller('UiCanvasController', require('./ui-canvas'));
