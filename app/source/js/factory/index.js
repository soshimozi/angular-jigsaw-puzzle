'use strict';
var app = require('angular').module('angular-application');

app.factory('ShapeFactory', require('./shape-factory'));
app.factory('JigsawPuzzleFactory', require('./jigsaw-puzzle-factory'));