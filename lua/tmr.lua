-- tmr.lua

-- set target/port first
--ex) target="iot1.meteor.com"
--[[
--local
target="192.168.0.11"
port=3000
]]--
-- when connected AP
wifi.setmode(wifi.STATION)
conn=net.createConnection(net.TCP, false)
function sensorTrigger()
  gpio.mode(4, gpio.INPUT, gpio.PULLUP)
  tmr.alarm(0, 1000, 1, function()
  	status=gpio.read(4)
    sendStatus(4,status)
  end)
  print("sensor initiated")
end

conn:connect(port, target)

function sendStatus(sensor,status)
  conn:send("GET /sensor/"..sensor.."/"..status.."\r\nHost: "..target.."\r\n\r\n")
end

sensorTrigger()
