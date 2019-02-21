# JavaScript-MQTT-Client-With-Websockets

## Iot Project
![screen shot 2019-02-21 at 10 58 25](https://user-images.githubusercontent.com/38040414/53164297-c9af8c80-35c7-11e9-8edf-6985c6831971.png)


**MQTT Broker**
Raspberry PI 
```
$ sudo nano /etc/mosquitto/mosquitto.conf   
```
| **File: /etc/mosquitto/mosquitto.conf** |
| --- |
| # Place your local configuration in /etc/mosquitto/conf.d/ <br># <br># A full description of the configuration file is at <br># /usr/share/doc/mosquitto/examples/mosquitto.conf.example<br><br>pid_file /var/run/mosquitto.pid<br><br>persistence true persistence_location /var/lib/mosquitto/<br><br>log_dest file /var/log/mosquitto/mosquitto.log<br><br>include_dir /etc/mosquitto/conf.d<br><br><br>listener 1883<br>listener 1884<br>protocol websockets |


**MQTT Client**
ESP8266 NodeMCU LUA using MQTT protocol (with Mosquitto - message broker that Implements MQTT). 

**MQTT Client**
JavaScript MQTT over websockets (Paho website - <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"></script>
)




