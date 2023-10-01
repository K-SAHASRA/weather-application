const express =  require("express");
const https = require("https");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.get("/",function(req, res){

  res.sendFile( __dirname + "/index.html");
});

app.post("/", function(req, res){

  const query =req.body.cityName;
  const apikey= "6602f9375bf979d7450ab770c14c80f7";
  const units= "metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+units;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherdata = JSON.parse(data)
      const temp = weatherdata.main.temp;
      const weatherdiscription = weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon
      const imageurl = "https://openweathermap.org/img/wn/" + icon +"@2x.png"
      res.write("<p>the current weather is "+ weatherdiscription + "<p>");
      res.write("<h1>the temperature in " + query + " is " + temp + " degress celsius.</h1>");
      res.write("<img src="+ imageurl+">");
      res.send()

    })

  })

});




app.listen(3000, function(){
  console.log("server is running on port 3000.");
})
