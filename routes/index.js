var express = require('express');
var JustGage = require('justgage');
var router = express.Router();
var mqtt = require('mqtt');
var clientId = "iot_web_" + Math.floor((1 + Math.random()) * 0x10000000000).toString(16);
var topicTemp = "FromESPtoWeb/temp";
var topicDoor = "FromESPtoWeb/door";
var topicWindow = "FromESPtoWeb/window";
var topicMoisture = "FromESPtoWeb/moisture";
var topicMotion = "FromESPtoWeb/motion";
var client = mqtt.connect("ws://192.168.0.200:1884/ws", {
    clientId: clientId
})

var content = { doorMsg: "Door Closed" , windowMsg: "Window Closed", tempMsg:"", moistureMsg:"", motionMsg: "", chart1 : chart1, chart2: chart2};


//Connection and subscribe to topics
client.on('connect', function () {

    client.on('message', function (topic, message) {
        if(topic === topicTemp) {
            temp(message);
        }
        if(topic === topicDoor) {
            door(message);
        }
        if(topic === topicWindow) {
            window(message);
        }
        if(topic === topicMoisture) {
            moisture(message);
        }
        if(topic === topicMotion) {
            motion(message);
        }

    });

    client.subscribe(topicTemp, function (err) {
        if (err) {
            alert("something went wrong on subscribe to message");
        }
    });
    client.subscribe(topicDoor, function (err) {
        if (err) {
            alert("something went wrong on subscribe to message");
        }
    });
    client.subscribe(topicWindow, function (err) {
        if (err) {
            alert("something went wrong on subscribe to message");
        }
    });
    client.subscribe(topicMoisture, function (err) {
        if (err) {
            alert("something went wrong on subscribe to message");
        }
    });
    client.subscribe(topicMotion, function (err) {
        if (err) {
            alert("something went wrong on subscribe to message");
        }
    });


});

var temp = (message) => {
    console.log(message.toString());
    content.tempMsg = message.toString();
    char1 = chart1(content.tempMsg);
}
var door = (message) => {
    if (message == "Door Open") {
        console.log("Door open");
        content.doorMsg = message;
    }else if (message == "Door Closed") {
        console.log("Door closed");
        content.doorMsg = message;
    }
}
var window = (message) => {
    if (message == "Window Open") {
        console.log("window open");
        content.windowMsg = message;
    }else if (message == "Window Closed") {
        console.log("window closed");
        content.windowMsg = message;
    }
}
var moisture = (message) => {
    console.log(message.toString());
    content.moistureMsg = message.toString();
    char2 = chart2(content.moistureMsg);
}
var motion = (message) => {
    console.log(message.toString());
    content.motionMsg = message.toString();
}
/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', {  content : content } );
});

// turn led on
router.post('/turnOnLed', function (req, res) {
    turnOnLED();
    res.render('index', {  content : content } );
});


// turn led off
router.post('/turnOffLed', function (req, res) {
    turnOffLED();
    res.render('index', {  content : content } );
});

// turn heater on
router.post('/turnOnHeater', function (req, res) {
    turnOnHeater();
    res.render('index', {  content : content } );
});

// turn heater off
router.post('/turnOffHeater', function (req, res) {
    turnOffHeater();
    res.render('index', {  content : content } );
});

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


var g1;
var min = 0;
var max = 50;

var g2;
var minG2 = 0;
var maxG2 = 100;
var moisture = 50;


var chart1 = (temperature)=>{

    return new JustGage({
        id: "g1",
        value: temperature,
        min: min,
        max: max,
        title: "Temperature",
        label: "Celsius",
        levelColorsGradient: true,
        levelColors: ["FF0000", "FF6103", "FFFF00", "00FF00", "FFFF00", "FF0000"],
        shadowSize: 2,
        shadowVerticalOffset: 12
    });
}
var chart2 = (moisture) =>{
        return new JustGage({
            id: "g2",
            value: moisture,
            min: minG2,
            max: maxG2,
            title: "Soil Moisture",
            label: "%",
            levelColorsGradient: true,
            levelColors: ["FF0000", "FF6103", "FFFF00", "00FF00", "FFFF00", "FF0000"],
            shadowSize: 2,
            shadowVerticalOffset: 12
        });
}
module.exports = router;