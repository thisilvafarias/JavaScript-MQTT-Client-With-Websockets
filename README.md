# JavaScript-MQTT-Client-With-Websockets

## Iot Project
 <p align="center">
 <img src="https://user-images.githubusercontent.com/38040414/53164297-c9af8c80-35c7-11e9-8edf-6985c6831971.png" width="500"> by Thiago Farias
</p>

**MQTT Broker**
- Raspberry Pi 
```
$ sudo nano /etc/mosquitto/mosquitto.conf   
```
| **File: /etc/mosquitto/mosquitto.conf** |
| --- |
| # Place your local configuration in /etc/mosquitto/conf.d/ <br># <br># A full description of the configuration file is at <br># /usr/share/doc/mosquitto/examples/mosquitto.conf.example<br><br>pid_file /var/run/mosquitto.pid<br><br>persistence true persistence_location /var/lib/mosquitto/<br><br>log_dest file /var/log/mosquitto/mosquitto.log<br><br>include_dir /etc/mosquitto/conf.d<br><br><br>listener 1883<br>listener 1884<br>protocol websockets |


**MQTT Client**
- ESP8266 NodeMCU LUA  <br>
MQTT protocol (with Mosquitto - message broker that Implements MQTT). 

**MQTT Client**
- JavaScript MQTT over websockets  <br>
(Paho website - <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"></script>
)




