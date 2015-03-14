var NeoPixelDevice = require('./lib/neopixel-serial');
var np = new NeoPixelDevice('/dev/tty.usbmodem1411');
var io = require('socket.io').listen(3000);

var lastLEDState = null;
var lastBrightState = null;

io.sockets.on('connection', function(socket) {
    if (lastLEDState !== null) {
        console.log('lastLEDState');
        socket.emit('statechange',lastLEDState);
    }
    if (lastBrightState !== null) {
        console.log('lastBrightState');
        socket.emit('statechange',lastBrightState);
    }
    socket.on('setBrightness', function(level) {
        np.setBrightness(level);
        np.show();
    });
    socket.on('setColorAll', function(r,g,b) {
        console.log('setColorall');
        console.log(arguments);
        np.setColorAll(r,g,b);
        np.show();
    });
    socket.on('setColor', function(led,r,g,b) {
        np.setColor(led.r.g.b);
        np.show();
    });
});

np.on('message', function(data) {
    console.log(data);
    try {
        var obj = JSON.parse(data);
        io.sockets.emit('statechange',obj);
        if (obj['brightness'] !== undefined) {
            lastBrightState = obj;
        } else {
            lastLEDState = obj;
        }
    } catch(err) {
        console.log('could not parse JSON:%s',err);
        console.log(data);
    }
});


/*

np.setBrightness(255);
np.setColorAll(255,255,255);
np.show();

var pin = 0;
var bright = 0;
//setTimeout(function() {
setInterval(function() {
    if (bright > 255) {
        bright = 0;
    } else {
        bright++;
    }
    if (pin < 12) {
        pin++;
    } else {
        pin = 0;
    }
    np.setColor(pin,255,0,0);
    np.setColor(pin-1,0,0,0);
    np.setBrightness(bright);
    np.show();
},100);
*/