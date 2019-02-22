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

var myButtonWasClicked = () => {
  if (client.connected) {
    client.publish(topicMessage, 'Hello from website');
  }
}

var myMessageArrived = () => {
  client.on('message', function (topic, message) {
    if (message == "button pushed") {
      alert("The pushbutton was pushed!");
    }
  })
};


// This function handles "Turn LED on" button clicks
var turnOnLED = () =>  {
  if (client.connected) {
    client.publish('WebToEsp/led', 'turn led on');
  }
}

// This function handles "Turn LED on" button clicks
var turnOffLED = () => {
  if (client.connected) {
    client.publish('WebToEsp/led', 'turn led off');
  }
}

module.exports = myButtonWasClicked, myMessageArrived, turnOnLED, turnOffLED