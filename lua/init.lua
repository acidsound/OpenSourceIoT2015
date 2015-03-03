wifi.setmode(wifi.STATIONAP)
wifi.sta.disconnect()
cfg={}
cfg.ssid="pusher"
cfg.pwd="pusherpusher"
wifi.ap.config(cfg)
ip={}
ip.ip="192.168.0.101"
ip.netmask="255.255.255.0"
ip.gateway="192.168.1.1"
wifi.ap.setip(ip)

gpio.mode(4, gpio.INPUT)
gpio.mode(3, gpio.OUTPUT)
gpio.write(3, gpio.LOW)

function _(a)
  for k,_ in pairs(a) do print(k) end
end

print("gpio 3: OUTPUT")
print("gpio 4: INPUT")
print("WIFI - STATIONAP mode")
print(wifi.ap.getip())
print("6600 Server Initiated")
