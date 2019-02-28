// Base ESP8266
#include <ESP8266WiFi.h>
WiFiClient WIFI_CLIENT;

// MQTT
#include <PubSubClient.h>
PubSubClient MQTT_CLIENT;


#define HEATER 14 //d5


// This function runs once on startup
void setup() {
  // Initialize the serial port
  Serial.begin(115200);


  // Configure HEATER pin as an output
  pinMode(HEATER, OUTPUT);


  // Attempt to connect to a specific access point
  WiFi.begin("coucou_toi", "Bonjourdublin2");

  // Keep checking the connection status until it is connected
  while (WiFi.status() != WL_CONNECTED) {
      delay(500);
  }

  // Print the IP address of your module
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

// This function handles received messages
void myMessageArrived(char* topic, byte* payload, unsigned int length) {
  // Convert the message payload from bytes to a string
  String message = "";
  for (unsigned int i=0; i< length; i++) {
    message = message + (char)payload[i];
  }
   
  // Print the message to the serial port
  Serial.println(message);

  // Check if message is "turn HEATER on"
  if(message == "turn heater on") {
    // Turn the HEATER on
    digitalWrite(HEATER, HIGH);
  }

  // Check if message is "turn HEATER off"
  if(message == "turn heater off") {
    // Turn the HEATER off
    digitalWrite(HEATER, LOW);
  }
}

// This function connects to the MQTT broker
void reconnect() {
  // Set our MQTT broker address and port
  MQTT_CLIENT.setServer("192.168.0.200", 1883);
  //MQTT_CLIENT.setServer("iot.eclipse.org", 1883);
  
  MQTT_CLIENT.setClient(WIFI_CLIENT);

  // Loop until we're reconnected
  while (!MQTT_CLIENT.connected()) {
    // Attempt to connect
    Serial.println("Attempt to connect to MQTT broker");
    MQTT_CLIENT.connect("esp");

    // Wait some time to space out connection requests
    delay(3000);
  }

  Serial.println("MQTT connected");

  // Subscribe to the topic where our web page is publishing messages
  MQTT_CLIENT.subscribe("WebToEsp/heater");                                  ///*****topic******//
 

  // Set the message received callback
  MQTT_CLIENT.setCallback(myMessageArrived);
}

// This function runs over and over again in a continuous loop
void loop() {

  // Check if we're connected to the MQTT broker
  if (!MQTT_CLIENT.connected()) {
    // If we're not, attempt to reconnect
    reconnect();
  }


  // Check for incoming MQTT messages
  MQTT_CLIENT.loop();
}
