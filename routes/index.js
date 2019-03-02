var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');
var clientId = "iot_web_" + Math.floor((1 + Math.random()) * 0x10000000000).toString(16);
//var topicLed = "WebToEsp/led";
//var topicHeater = "WebToEsp/heater";
var topicMessage = "FromESPtoWeb/door";
var client = mqtt.connect("ws://192.168.0.200:1884/ws", {
    clientId: clientId
});


//Connection and subscribe to topics
client.on('connect', function () {

    //Subscribe to topic message
    client.subscribe(topicMessage, function (err) {
        if (err) {
            alert("something went wrong on subscribe to message");
        }
    })

})
var content = "door open";
client.on('message', function (topic, message) {
    if (message == "button pushed") {
     //   console.log("The pushbutton was pushed!");
     //   content = message;
        doorClosed(message);
        client.emit("updated messages", content);
    }
});

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: content });
});

var doorOpen = () => {
    console.log("door open");
}

var doorClosed = (message) => {
    console.log("door closed");
    content = message;
}
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

