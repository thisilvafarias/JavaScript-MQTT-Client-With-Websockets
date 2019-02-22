var express = require('express');
var router = express.Router();
var mqtt = require('mqtt');
var clientId = "iot_web_" + Math.floor((1 + Math.random()) * 0x10000000000).toString(16);
var topicLed = "WebToEsp/led";
var topicMessage = "Message";
var client = mqtt.connect("192.168.0.200:1884/ws", {
  clientId: clientId
});
client.on('connect', function () {
  client.subscribe(topicMessage, function (err) {
    if (err) {
      alert("something went wrong on subscribe");
    }
  })
  client.subscribe(topicLed, function (err) {
    if (err) {
      alert("something went wrong on subscribe");
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

router.post('/turnOn', function (req, res) {
  turnOnLED();
  res.render('index');
});

router.post('/turnOff', function (req, res) {
  turnOffLED();
  res.render('index');
});

router.post('/message', function (req, res) {
  myButtonWasClicked();
  res.render('index');
});

var myButtonWasClicked = () => {
  console.log("myButtonWasClicked");
  if (client.connected) {
    client.publish(topicMessage, 'Hello from website');
  }
}

// This function handles "Turn LED on" button clicks
var turnOnLED = () => {
  console.log("turnOnLED");
  if (client.connected) {
    client.publish('WebToEsp/led', 'turn led on');
  }
}

// This function handles "Turn LED on" button clicks
var turnOffLED = () => {
  console.log("turnOnLED");
  if (client.connected) {
    client.publish('WebToEsp/led', 'turn led off');
  }
}

module.exports = router;