//Express
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors')({origin: true});
var config = require('./config')

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors);

var firebase= require("firebase-admin");

var serviceAccount = require("./key.json");

firebase.initializeApp({
 credential: firebase.credential.cert(serviceAccount),
 databaseURL: "https://deliverr-it-bitch.firebaseio.com"
});

app.get('/', (req, res) => {
  return cors(req, res, () => {
		 firebase.database().ref('/').once("value", (data) => {res.send(data);});

	});
})

app.get('/profile/:userid', (req, res) => {
  return cors(req, res, () => {
    console.log(req.params.userid)
    firebase.database().ref('/UserAccount/' + req.params.userid).once('value', (data) => {res.send(data);});

	});
});

app.get('/package/:packageid', (req, res) => {
  return cors(req, res, () => {
    firebase.database().ref('/Package/' + req.params.packageid).once('value', (data) => {res.send(data);});
  });
});

app.get('/travel/:tid', (req, res) => {
  return cors(req, res, () => {
    firebase.database().ref('/TravelInformation/' + req.params.tid).once('value', (data) => {res.send(data);});
  });
});

app.get('/travelInfo/:userid', (req, res) => {
  var userid = req.params.userid;
  var array = [];
  var accList = {}
  firebase.database().ref('/TravelInformation').once('value', (data) => {
  accList = data.val(); }).then(() => {
  var i = 0
  var loopBool = true
  while(loopBool) {
    console.log("Helo")
    console.log(accList)
    console.log(accList[i.toString()])
    if (accList[i.toString()]){

      if(accList[i.toString()]["UserID"] == userid){
        console.log(accList[i.toString()])
        array.push(accList[i.toString()])
      }

        i++;
    }else{
      loopBool = false;
      break;
    }
  }


  res.send(array)});
});

app.get('/getpackageA/:userid', (req, res) => {
  var userid = req.params.userid;
  var array = [];
  var accList = {}
  firebase.database().ref('/TravelInformation').once('value', (data) => {
  accList = data.val(); }).then(() => {
  var i = 0
  var loopBool = true
  while(loopBool) {
    if (accList[i.toString()]){

      if(accList[i.toString()]["UserID"] == userid){
        console.log(accList[i.toString()])
        array.push(accList[i.toString()])
      }

        i++;
    }else{
      loopBool = false;
      break;
    }
  }
  res.send(array)});
});

app.get('/getpackageB/:uid', (req, res) => {
  return cors(req, res, () => {
    firebase.database().ref('/Package/' + req.params.tid).once('value', (data) => {res.send(data);});
  });
});

app.get('/getpackageC/:uid', (req, res) => {
  return cors(req, res, () => {
    firebase.database().ref('/Package/' + req.params.tid).once('value', (data) => {res.send(data);});
  });
});

app.post('/addprofile', (req, res) => {
  // res.send(req.body)
  var body = req.body
  return cors(req, res, () => {

    var newPostKey = firebase.database().ref().child('UserAccount').push().key;
    updates[/UserAccount/UserID/ + newPostKey] = postData
    firebase.database().ref('UserAccount').set(body, function(error) {
      if (error) {
        // The write failed...
      } else {
        // Data saved successfully!
        res.send("Success")
      }
    });
  });
});


app.listen(5000, () => {
  console.log('Server is running. On Port 5000');
});
