var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');
var clientId = "iot_web_" + Math.floor((1 + Math.random()) * 0x10000000000).toString(16);
//var topicLed = "WebToEsp/led";
//var topicHeater = "WebToEsp/heater";
var topicMessagedoor = "FromESPtoWeb/door";
var topicMessagewindow = "FromESPtoWeb/window";
var client = mqtt.connect("ws://192.168.0.200:1884/ws", {
    clientId: clientId
});

var content = { doorMsg: "Door Closed" , windowMsg: "Window Closed" };

//Connection and subscribe to topics
client.on('connect', function () {

    //Subscribe to topic "FromESPtoWeb/door"
    client.subscribe(topicMessagedoor, function (err) {
        if (err) {
            alert("something went wrong on subscribe to message");
        }

    client.on('message', function (topic, doorMessage) {
        if (doorMessage == "Door Open") {
            doorOpen(doorMessage);
        }
    });

    client.on('message', function (topic, doorMessage) {
        if (doorMessage == "Door Closed") {
            doorClosed(doorMessage);
        }
    });
}) //subscribe door
// Subscribe to topic "FromESPtoWeb/window"
client.subscribe(topicMessagewindow, function (err) {
    if (err) {
        alert("something went wrong on subscribe to message");
    }
    client.on('message', function (topic, windowMessage) {
        if (windowMessage == "Window Open") {
            windowOpen(windowMessage);
        }
    });

    client.on('message', function (topic, windowMessage) {
        if (windowMessage == "Window Closed") {
            windowClosed(windowMessage);
        }
        });
    }) //subscribe window
})// connection

var doorOpen = (doorMessage) => {
    console.log("door open");
    content.doorMsg = doorMessage;
};


var doorClosed = (doorMessage) => {
    console.log("door closed");
    content.doorMsg = doorMessage;
}

var windowOpen = (windowMessage) => {
    console.log("window open");
    content.windowMsg = windowMessage;
};

var windowClosed = (windowMessage) => {
    console.log("window closed");
    content.windowMsg = windowMessage;
}

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {  content : content } );
});

// turn led on
router.post('/turnOnLed', function (req, res) {
    turnOnLED();
    res.render('index');
});



// turn led off
router.post('/turnOffLed', function (req, res) {
    turnOffLED();
    res.render('index');
});

// turn heater on
router.post('/turnOnHeater', function (req, res) {
    turnOnHeater();
    res.render('index');
});

// turn heater off
router.post('/turnOffHeater', function (req, res) {
    turnOffHeater();
    res.render('index');
});

/*Method with how to publish
var howToPublish = () => {
    console.log("Publishing");
    if (client.connected) {
        client.publish(topicMessage, 'Hello from website');
    }
}
*/
//******      LED      *****//*
var turnOnLED = () => {
    console.log("turnOnLED");
    if (client.connected) {
        client.publish('WebToEsp/led', 'turn led on');
    }
}

var turnOffLED = () => {
    console.log("turnOffLED");
    if (client.connected) {
        client.publish('WebToEsp/led', 'turn led off');
    }
}

//******      HEATER      *****//
var turnOnHeater = () => {
    console.log("turnOnHeater");
    if (client.connected) {
        client.publish('heater', 'turn heater on');
    }
}

//Heater was switched Off in the webpage
var turnOffHeater = () => {
    console.log("turnOffHeater");
    if (client.connected) {
        client.publish('heater', 'turn heater off');
    }
}


module.exports = router;

