var angular = require('angular');

require('angular-ui-router');

// bring in some angular global namespaces for injection
require('angular-router-browserify')(angular);
require('angular-bootstrap-npm');
require('ngalertify');


var app = angular.module('angular-application', ['ui.router', 'ui.bootstrap', 'ngAlertify', require('angular-resource'), require('angular-input-masks')]);


app.constant('viewUrl', function(relativePath) {
    return '/views' + relativePath ;
});


// configure the routes
app.config(require('./route'));

require('./service');
require('./controller');

// get required components
require('./factory');
require('./directive');
require('./filter');

require('./errorconfig');
