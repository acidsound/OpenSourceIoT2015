-- set target first
--ex) target="iot1.meteor.com"

-- when connected AP
wifi.setmode(wifi.STATION)
conn=net.createConnection(net.TCP, false)

function sensorTrigger()
  gpio.mode(4, gpio.INT, gpio.PULLUP)
  gpio.trig(4, "both", function(l)
    status = bit.bnot(l)+2
    gpio.write(3,bit.bnot(l)+2)
    sendStatus(4,status)
    print("4 pin status : "..status)
  end)
  print("sensor initiated")
end

--conn:on("receive", function(conn, pl) print(pl) end)

conn:connect(80, target)

function sendStatus(sensor,status)
  conn:send("GET /sensor/"..sensor.."/"..status.."\r\nHost: "..target.."\r\n\r\n")
end

sensorTrigger()
