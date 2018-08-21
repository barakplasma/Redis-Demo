var express = require('express');
var app = express();

var connectionData = {
  url: process.env.RedisURL
};

var redis = require("redis");
  

var usingRedisClient = function(clientAction) {
    var client = redis.createClient(connectionData);
    client.on("error", function (err) {
      console.log("Error " + err);
    });
    clientAction(client);
    client.quit();
}


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.
 
// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public')); 

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/getMessages", function (request, response) {
  response.send(messages);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/sendMessage", function (request, response) {
  messages.push(request.query.message);
  usingRedisClient((client)=> client.hset('messages','message:' + index,request.query.message));
  index +=1;
  response.sendStatus(200);
});
// Test
let messages = [],
    index = 0;

usingRedisClient(function(client) { client.hgetall('messages', function(err, replies) {
  //console.log(replies);
  for(var item in replies){
    messages.push(replies[item]);
  }
  index = messages.length + 1;
})})
 
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});