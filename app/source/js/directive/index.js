'use strict';
var app = require('angular').module('angular-application');

app.directive('uiCanvas', require('./ui-canvas'));
app.directive('uiShape', require('./ui-shape'));
app.directive('ngScopeElement', require('./ng-scope-element'));