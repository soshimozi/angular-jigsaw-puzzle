/* global angular */
/* global Image */

'use strict';

function NgPuzzleDirective(JigsawPuzzleFactory) {
    
    return {
        restrict: 'EA',
        scope: {
            size: '@',
            src: '@',
            api: '='
        },
        template: '<canvas ng-scope-element="canvas" height="{{height}}" width="{{width}}"></canvas>',
        link: function(scope, elm, attrs) {
            
            var loading = true,
                image = new Image(),
                ctx;
            
            console.log('ngPuzzle link');
            
            ctx = scope.canvas[0].getContext('2d');
            
            console.log('ctx: ', ctx);
            
            function create() {
                
                var options = { img: image, height: scope.height, width: scope.width, context: ctx };
                console.log('options: ', options);
                
                
                scope.puzzle = JigsawPuzzleFactory(options);

                if (attrs.api) {
                    scope.api = scope.puzzle;
                }                    
            }
            
            function cut() {
                if(scope.puzzle === null || scope.puzzle === undefined)
                {
                    create();
                }

                if(loading) {
                    return;
                }
                
                // go through and cut each puzzle piece based on image
                scope.puzzle.cut();
            }

            attrs.$observe('src', function(src) {
                loading = true;
                image.src = src;
                image.onload = function() {
                    loading = false;
                    scope.$apply(function() {
                        cut();
                    });
                };
            });        
            
            attrs.$observe('size', function(width) {
                
                var size = scope.size.split('x');
                if(size.length == 2) {
                    scope.width = size[0];
                    scope.height = size[1];
            
                    create();
                }
            });
            
        }
    };
}


NgPuzzleDirective.$inject = ['JigsawPuzzleFactory'];

module.exports = NgPuzzleDirective;
