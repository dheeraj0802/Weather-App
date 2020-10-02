var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();

var apiKey = '*****************';
app.use(express.static(__dirname + '/public'));


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
});

app.post('/',function(req,res){
  var city = req.body.city;
  console.log(city);
  var url = 'http://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=85feb8a0d878d7fcf560fd749903ba75';
  request(url,function(err,response,body){
    if (!err && response.statusCode==200){
      var results = JSON.parse(body);
      console.log(results.main.temp);
      var weathertext = "It is "+ results.main.temp + " degree with " + results.weather[0].main + " in "+ city;
      console.log(weathertext);
      res.render('index', {weather: weathertext, error: null});
    }
    else{
      res.send("Please Check your Input");
    }
  });
});



app.listen(3000, function () {
  console.log('Weatherly app listening on port 3000!');
});
