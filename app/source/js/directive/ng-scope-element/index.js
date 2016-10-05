/* global angular */

'use strict';

function NgScopeElement() {
    
    return {
        restrict: "A",
    
        compile: function compile(tElement, tAttrs, transclude) {
          return {
              pre: function preLink(scope, iElement, iAttrs, controller) {
                scope[iAttrs.ngScopeElement] = iElement;
              }
            };
        }
    };
}


NgScopeElement.$inject = [];

module.exports = NgScopeElement;
