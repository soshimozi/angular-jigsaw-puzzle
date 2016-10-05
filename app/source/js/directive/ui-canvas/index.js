/* global angular */

'use strict';

function UiCanvasDirective($timeout) {
    
    return {
        restrict: 'EA',
        scope: {
            width: '@',
            height: '@'
        },
        controllerAs: 'vm',
        controller: 'UiCanvasController',
        transclude: true,
        template: '<canvas ng-scope-element="canvas" height="{{height}}" width="{{width}}"></canvas><div ng-transclude></div>',
        link: function(scope, elm, attr, ctrl) {
            ctrl.setContext(scope.canvas[0].getContext('2d'));
        }
    };
}


UiCanvasDirective.$inject = ['$timeout'];

module.exports = UiCanvasDirective;
