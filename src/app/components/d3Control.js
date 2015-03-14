var D3Control = function($scope,np) {
    var self = this;
    this.np = np;
    this.red = 0;
    this.green = 0;
    this.blue = 0;
    this.brightness = 255;

    this.lastTimeout = null;
    this.lastTimeoutBright = null;


    $scope.$watch('ctrl.red', this.onRGBChange.bind(this));
    $scope.$watch('ctrl.green', this.onRGBChange.bind(this));
    $scope.$watch('ctrl.blue', this.onRGBChange.bind(this));

    $scope.$watch('ctrl.brightness', this.onBrightChange.bind(this));

    this.data = [
        {i:0,r:128,g:128,b:25},
        {i:1,r:128,g:128,b:25},
        {i:2,r:128,g:128,b:25},
        {i:3,r:128,g:128,b:25},
        {i:4,r:128,g:128,b:25},
        {i:5,r:128,g:128,b:25},
        {i:6,r:128,g:128,b:25},
        {i:7,r:128,g:128,b:25},
        {i:8,r:128,g:128,b:25},
        {i:9,r:128,g:128,b:25},
        {i:10,r:128,g:128,b:25},
        {i:11,r:128,g:128,b:25}
    ];
    $scope.$on('ledstatechange', function(event,ndata) {
        $scope.$apply(function() {
            self.data = ndata;
            if (self.lastTimeout == null) {
                self.red = ndata[0].r;
                self.green = ndata[0].g;
                self.blue = ndata[0].b;
            }
        });
    });
    $scope.$on('brightstatechange', function(event,ndata) {
        $scope.$apply(function() {
            if (self.lastTimeoutBright == null) {
                self.brightness = ndata.brightness;
            }
        });
    });

};

D3Control.prototype.onRGBChange = function() {
    var self = this;

    if (this.lastTimeout !== null) {
        return;
    }

    this.lastTimeout = setTimeout(function() {
        self.np.setColorAll(self.red,self.green,self.blue);
        self.lastTimeout = null;
    },100);
};

D3Control.prototype.onBrightChange = function() {
    var self = this;
    if (this.lastTimeoutBright !== null) {
        return;
    }

    this.lastTimeoutBright = setTimeout(function() {
        self.np.setBrightness(self.brightness);
        self.lastTimeoutBright = null;
    },100);
};

D3Control.prototype.test = function() {
    this.np.setColorAll(this.red,this.green,this.blue);
};

D3Control.prototype.click = function(i) {
    console.log('click ' + i);
};

angular.module('app').controller('d3Ctrl',['$scope','neoPixelSocketService',D3Control]);