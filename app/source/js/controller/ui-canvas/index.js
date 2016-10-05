'use strict';
 
function UiCanvasController($scope) {
    
    var self = this;
    
    self.shapes = [];
    
    self.setContext = function(c) {
        self.context2d = c;
    };
    
    self.addShape = function(s) {
        console.log('add shape: ', s);
        
        self.shapes.push(s);
    };
    
    self.redraw = function() {
        // iterate each shape and draw it
        for(var index in self.shapes) {
            var shape = self.shapes[index];
            shape.draw(self.context2d);
        }
    };
    
    
    $scope.$watch('vm.shapes.length', function() {
        self.redraw();
    });
}

// love our dependency injection and we are now safe from obfuscation
UiCanvasController.$inject = ['$scope'];

module.exports = UiCanvasController;
