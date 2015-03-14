var neoPixelSocketServiceFactory = function($rootScope) {
    var NeoPixelSocketService = function() {
        this.socket = io.connect('192.168.1.146:3000');
        this.socket.on('statechange', function(data) {
            if (data['brightness'] !== undefined) {
                $rootScope.$broadcast('brightstatechange',data);
            } else {
                $rootScope.$broadcast('ledstatechange',data);
            }
        });
    };

    NeoPixelSocketService.prototype.setColorAll = function(r,g,b) {
        this.socket.emit('setColorAll',r,g,b);
    };

    NeoPixelSocketService.prototype.setColor = function(led,r,g,b) {
        this.socket.emit('setColor',led,r,g,b);
    };

    NeoPixelSocketService.prototype.setBrightness = function(brightness) {
        this.socket.emit('setBrightness',brightness);
    };

    return new NeoPixelSocketService();
};

angular.module('app').service('neoPixelSocketService',['$rootScope',neoPixelSocketServiceFactory]);