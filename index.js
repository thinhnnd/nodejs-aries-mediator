const express = require('express')
const bodyParser = require('body-parser')
const amqp = require("amqplib")
var FCM = require('fcm-node');


const url = "amqp://jmqtkgqu:o4pXSH0Wf8BJloM6F648eaKhWTiQJwIs@lion.rmq.cloudamqp.com/jmqtkgqu"

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var options = {
  inflate: true,
  limit: '100kb',
  type: 'application/ssi-agent-wire'
};

// var options2 = {
//   inflate: true,
//   limit: '100kb',
//   type: 'application/json'
// };
app.use(bodyParser.raw(options));

//app.use(bodyParser.raw(options2));


const port = 3000


var serverKey = 'AAAAN3_Y9d4:APA91bFlfCUnSgFZNu9fjTO48OB6vtQyLO0mdrdzk9u1KLehoitRw18jdo3lJqQe3i3jAUNn90B0lvFlvMws8mcnAS7sQQDovRIBc8KNIfl4ZvcUZ6Ck1AxfD2RIHxv4rlkwHGbwZ2gB'; // put your server key here
  var fcm = new FCM(serverKey);


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/', (req, res) => {

  



  // fcm.send(message, function(err, response){
  //     if (err) {
  //         console.log("Something has gone wrong!");
  //     } else {
  //         console.log("Successfully sent with response: ", response);
  //     }
  // });
  console.log('new');
  console.log(req.body);
  res.send(req.body);
})

app.post('/register-endpoint', (req, res) => {
  return "oK";
})

app.post('/relay-service', async (req, res) => {
  try {
    //var result = await sendToFcmService(req.body);
    console.log(req.body)
    var result = await sendMsgToRbmqServer(req.body);

    res.send(result);
  } catch (e) {
    console.log(e.toString());
  }


})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

async function sendMsgToRbmqServer(buffer) {

  try {
    const connection = await amqp.connect(url);
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("ssi-message");

    //channel.sendToQueue("ssi-message", buffer);
    await sendToFcmService(buffer)
    return "OK";
  }
  catch (ex) {
    console.log(ex);
  }
}

async function sendToFcmService(buffer) {
  
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    to: 'dNsO48an_gs:APA91bFxfCKBfVUd6dFpITl3aXnCQcUeU3OZ85KtXUGyrDxByk08gOPeU1rLtYqUvDrhcVDn3sJ57yiWRjZbc3nUsPdMQ1H33YLAOtFh_rquMbpzHa8oqKMbQ1OVkWUlv9Xz3DmUYf1j',
    notification: {
      title: 'Push from NodeJS',
      body: 'NodeJS post demo'
    },
    data: buffer
  };
    //var response = await fcm.send(message);
    fcm.send(message, function(err, response){
       if (err) {
           console.log(err);
       } else {
        console.log("Successfully sent with response: ", response);
        return response;
       }
   });
}