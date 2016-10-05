/* global angular */

'use strict';

function UiShape(ShapeFactory) {
    
    return {
        restrict: 'E',
        require: '^uiCanvas',
        scope: {
            x: '@',
            y: '@',
            color: '@',
            shapeOptions: '&',
            shapeType:'@'
        },
        link: function(scope, elem, attrs, ctrl) {
            
            var options = scope.$eval(scope.shapeOptions);
            var shape = new ShapeFactory[scope.shapeType](parseInt(scope.x, 10), parseInt(scope.y, 10), scope.color, options);
            ctrl.addShape(shape);
            
            //// TODO: comes from shapefactory 
            //// shapefactory creates instances of different shapes
            //// such as line, rectangle, arc, circle, bezier, polygon, etc...
            //// the shape just knows how to draw itself and thats it
            //var shape = {
            //    strokeStyle: scope.color,
            //    draw: function(ctx) {
            //        ctx.save();
            //        ctx.strokeStyle = this.strokeStyle;
            //        ctx.strokeRect(20, 20, 100, 100);
            //        ctx.restore();
            //    }
            //};
            
            //ctrl.addShape(shape);
            
        }
    };
}


UiShape.$inject = ['ShapeFactory'];

module.exports = UiShape;