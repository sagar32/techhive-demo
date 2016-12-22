var express = require('express')
var app = express()
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

 var myMongoCon = require('./myMongoCon'); // MongoDb Connection
        myMongoCon.connectToServer(function (err) {
            if (err) {
                console.log("Connection failed");
            }
        });

app.get('/', function (req, res) {
  res.send('Hello sagar!')
})

app.post('/send-data', function (req, res) {
	console.log(req.body);
	var db = myMongoCon.getDB();
    var signalData = db.collection("signal-data");
	var signal = req.body.data;
	signalData.insert({signal: signal});
  res.send(req.body)
})


app.listen(3000, function () {
  console.log('App listening on port 3000!')
})
