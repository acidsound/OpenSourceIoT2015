function sensorTrigger()
  gpio.mode(4, gpio.INT, gpio.PULLUP)
  gpio.trig(4, "both", function(l)
    gpio.write(3,bit.bnot(l)+2)
  end)
  print("sensor initiated")
end

function startServer()
  srv=net.createServer(net.TCP)
  print("AP started")
  srv:listen(80,function(conn)
    conn:on("receive", function(conn, payload)
      _, _, method, url, vars = string.find(payload, "([A-Z]+) /([^?]*)%??(.*) HTTP")
      print(method.."["..url.."]"..vars)
      conn:send("<html>")
      conn:send("<head><meta name=\"viewport\" content=\"width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0\"></head>")
      conn:send("<body><h1>RayTracer</h1>")
      if (url=="") then
        print("get AP List")
        conn:send("<h1>connectionList</h1>")
        conn:send("<ul>")
        for k,_ in pairs(aplist) do
          print(k)
          conn:send("<li><a href='./"..k.."'>"..k.."</a></li>")
        end
        conn:send("</ul>")
      else
        if (vars=="") then
          conn:send("<h2>"..url.."</h2>")
          conn:send("<form>")
          conn:send("<label>Password</label><input name='password' type='password'/>")
          conn:send("<button type='submit'>connect</button>")
          conn:send("</form>")
        else
          print("connect to WiFi")
          _,_,password=string.find(vars, "password=(.*)")
          wifi.sta.config(vars, password)
          if wifi.sta.status()==5 then
            conn:send("<h1>WiFi connected</h1>")
            conn:send("<h2>"..wifi.sta.getip().."</h2>")
            sensorTrigger()
          else
            conn:send("<h1>Connection Fail</h1>")
          end
          conn:send("<div><a href='/'>to the Home</a></div>")
        end
      end
      conn:send("</body></html>")
    end)
  end)
end

aplist={}
wifi.sta.getap(function(t)
  aplist = t
  startServer()
end)

print("device on")
