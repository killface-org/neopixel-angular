var serialport = require("serialport");
var async = require('async');
var event = require('events');
var util = require('util');

var NP_SHOW = 25;
var NP_SET_BRIGHT = 26;
var NP_SET_COLOR_ALL = 27;
var NP_SET_COLOR = 28;

var NeoPixelDevice = function(devicePort) {
    event.EventEmitter.call(this);
    this.devicePort = devicePort;
    this._initDevice();
    this._initQueue();
};

util.inherits(NeoPixelDevice,event.EventEmitter);

NeoPixelDevice.prototype._initDevice = function() {
    this._sp = new serialport.SerialPort(this.devicePort,{
        baudRate: 115200,
        parser: serialport.parsers.readline("\n")
    }, false);
    this._sp.on('open', this._onDeviceOpen.bind(this));
    this._sp.on('data', this._onDeviceMessage.bind(this));
    this._sp.open();
};

NeoPixelDevice.prototype._initQueue = function() {
    this._queue = async.queue(this._processTask.bind(this), 1);
    this._queue.pause();
};


NeoPixelDevice.prototype._processTask = function(task, callback) {
    var self = this;
    this._sp.write(task.values, function(error) {
        if (error) {
            console.log('Error writing data %s',task.values);
            callback(error,null);
            return;
        }
        self._sp.drain(function() {
            setTimeout(function() {
                callback();
            },10);
        });
    });
};

NeoPixelDevice.prototype._onDeviceOpen = function(error) {
    var self = this;

    if (error) {
        console.log('Error opening device(%s):%s',this.devicePort,error);
        return;
    }
    //It takes some time after the open event is fired for the port to be ready for writes.
    setTimeout(function() {
        self._queue.resume();
    },2000);
};

NeoPixelDevice.prototype._onDeviceMessage = function(data) {
   this.emit('message',data);
};

NeoPixelDevice.prototype.show = function() {
    this._queue.push({values:[NP_SHOW]});
};

NeoPixelDevice.prototype.setBrightness = function(level) {
    this._queue.push({values:[NP_SET_BRIGHT,level]});
};

NeoPixelDevice.prototype.setColorAll = function(r,g,b) {
    this._queue.push({values:[NP_SET_COLOR_ALL,r,g,b]});
};

NeoPixelDevice.prototype.setColor = function(i,r,g,b) {
    this._queue.push({values:[NP_SET_COLOR,i,r,g,b]});
};

module.exports = NeoPixelDevice;

