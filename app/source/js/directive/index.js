'use strict';
var app = require('angular').module('angular-application');

app.directive('uiShape', require('./ui-shape'));
app.directive('ngScopeElement', require('./ng-scope-element'));
app.directive('ngPuzzle', require('./ng-puzzle'));
app.directive('uiCanvas', require('./ui-canvas'));
