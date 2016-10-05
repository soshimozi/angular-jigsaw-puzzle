'use strict';
 
function HomeController($http, alertify) {
    
    var vm = this;
    
    vm.message = "and Hello from the controller too!";
    alertify.success('Alertify loaded correctly');
    
    vm.doIt = function() {
        console.log('we are about to fire the call');
        
        $http.get('https://server-test-scottmccain.c9users.io/api/v1.2/test').then( 
            function(res) {
                console.log('response: ', res); 
            }, 
            function(err) {
                console.log('err: ', err);
            }
        );  
    };
     
    vm.width = 800;
    vm.height = 600;
     
    vm.shapes = []; 
     
    
    var x = 10;
    var y = 20;
    
    vm.addShape = function() {
        vm.shapes.push({x: x+=50, y: y+=50, options: {radius: 20, fill:true, fillStyle:'#000000', lineWidth:5}, color:'#FF0000', type: 'circle'});
    };

    vm.shapes.push({x: x+=50, y: y+=50, options: {width: 20, height: 20, fill:true, fillStyle:'#000000', lineWidth:5}, color:'#FF0000', type: 'rectangle'});
     
    vm.addShape();
}

// love our dependency injection and we are now safe from obfuscation
HomeController.$inject = ['$http', 'alertify'];

module.exports = HomeController;
