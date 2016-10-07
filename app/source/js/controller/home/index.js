'use strict';
 
function HomeController($http, alertify, $sce) {
    
    var vm = this;

    vm.settings = {};
    
    vm.screenSizes = [];
    
    vm.screenSizes.push({id: 0, label: "800x600", value: {width: 800, height:600}});
    vm.screenSizes.push({id: 1, label: "1024x768", value: {width: 1024, height:768}});
    vm.screenSizes.push({id: 2, label: "1280x1024", value: {width: 1280, height:1024}});
    vm.screenSizes.push({id: 3, label: "1680x1050", value: {width: 1680, height:1050}});
    vm.screenSizes.push({id: 4, label: "1920x1200", value: {width: 1920, height:1200}});
    
    vm.settings.pieces = 16;
    
    vm.initialized = false;
    
    vm.createPuzzle = function() {
        vm.initialized = true;

        vm.width = vm.settings.screenSize.width;
        vm.height = vm.settings.screenSize.height;
        
        
        vm.src = vm.settings.imageUrl;
        
        vm.settings = {};
    };
    
    
    vm.getSource = function() {
      return $sce.getTrustedResourceUrl(vm.settings.imageUrl);  
    };
    
}

// love our dependency injection and we are now safe from obfuscation
HomeController.$inject = ['$http', 'alertify', '$sce'];

module.exports = HomeController;
