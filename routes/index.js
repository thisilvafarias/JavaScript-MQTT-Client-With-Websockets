var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');
var clientId = "iot_web_" + Math.floor((1 + Math.random()) * 0x10000000000).toString(16);
var topicLed = "WebToEsp/led";
var topicHeater = "WebToEsp/heater";
var topicMessage = "Message";
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
    //Subscribe to topic led
    client.subscribe(topicLed, function (err) {
        if (err) {
            alert("something went wrong on subscribe to led");
        }
    })
    //Subscribe to topic heater
    client.subscribe(topicHeater, function (err) {
        if (err) {
            alert("something went wrong on subscribe to heater");
        }
    })

})

client.on('message', function (topic, message) {
    if (message == "button pushed") {
        alert("The pushbutton was pushed!");
    }
})

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index');
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

//Method with how to publish
var howToPublish = () => {
    console.log("Publishing");
    if (client.connected) {
        client.publish(topicMessage, 'Hello from website');
    }
}

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

//Led was switched Off in the webpage (from Post)
var turnOffHeater = () => {
    console.log("turnOffHeater");
    if (client.connected) {
        client.publish('heater', 'turn heater off');
    }
}

module.exports = router;

