'use strict';
var app = require('angular').module('angular-application');

app.filter('trusted', require('./trusted-filter'));
