# OpenSourceIoT2015
WiFi Module인 ESP8266 실습

## Parts
* ESP8266
* PL2303
* Jumper wires
* Sensor
* LED

## Reference
http://esp8266.co.uk/
http://nodemcu.com/index_en.html
http://nodemcu.github.io/

## Schematic
http://123d.circuits.io/circuits/604517-esp8266server-w-photosensor/view

## Lua
* init.lua : bootstrap
* t.lua : tcp server
* gfs.lua : http server
* ap.lua : http Server for AP
* ss.lua : sensor - HTTP client

## Meteor
* ESP8266 : esp8266 WebConsole w/serial port package
* iot1 : Simple REST Logger
