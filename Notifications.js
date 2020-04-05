// Notifications.js

    var FCM = require('fcm-node');
    var serverKey = 'AAAAN3_Y9d4:APA91bFlfCUnSgFZNu9fjTO48OB6vtQyLO0mdrdzk9u1KLehoitRw18jdo3lJqQe3i3jAUNn90B0lvFlvMws8mcnAS7sQQDovRIBc8KNIfl4ZvcUZ6Ck1AxfD2RIHxv4rlkwHGbwZ2gB'; // put your server key here
    var fcm = new FCM(serverKey);
 
    var message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
        to: 'registration_token', 
        collapse_key: 'your_collapse_key',
        
        notification: {
            title: 'Title of your push notification', 
            body: 'Body of your push notification' 
        },
        
        data: {  //you can send only notification or only data(or include both)
            my_key: 'my value',
            my_another_key: 'my another value'
        }
    };
    
    fcm.send(message, function(err, response){
        if (err) {
            console.log("Something has gone wrong!");
        } else {
            console.log("Successfully sent with response: ", response);
        }
    });

  