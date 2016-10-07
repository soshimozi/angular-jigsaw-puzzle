'use strict';
 
function NgPuzzleController($scope) {
    
    var self = this;
    
    

    self.init = function(api) {
        self.ctx = $scope.canvas[0].getContext('2d');
    };
    
}

// love our dependency injection and we are now safe from obfuscation
NgPuzzleController.$inject = ['$scope', 'JigsawPuzzleFactory'];

module.exports = NgPuzzleController;
