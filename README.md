# JavaScript-MQTT-Client-With-Websockets

## Iot Project

*MQTT Broker*
Raspberry PI 
sudo nano /etc/mosquitto/mosquitto.conf
| --- |
Place your local configuration in /etc/mosquitto/conf.d/

 A full description of the configuration file is at
 /usr/share/doc/mosquitto/examples/mosquitto.conf.example

pid_file /var/run/mosquitto.pid

persistence true
persistence_location /var/lib/mosquitto/

log_dest file /var/log/mosquitto/mosquitto.log

include_dir /etc/mosquitto/conf.d


listener 1883
listener 1884
protocol websockets
| --- |

**MQTT Client**
ESP8266 NodeMCU LUA using MQTT protocol (with Mosquitto - message broker that Implements MQTT). 

**MQTT Client**
JavaScript MQTT over websockets (Paho website - <script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"></script>
)




