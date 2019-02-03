var functions = require('firebase-functions');
var admin = require("firebase-admin");
var cors = require('cors') ({ origin : true });
var webpush = require('web-push');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

var serviceAccount = require("./key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
   databaseURL: 'https://pwagram-e16c1.firebaseio.com/' 
});
exports.storePostData = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
    cors (request,response,function(){
        admin.database().ref('posts').push({
            id:request.body.id,
            title: request.body.title,
            location: request.body.location,
            image: request.body.image
        })
        .then(function(){
            webpush.setVapidDetails('mailto:harshitbatra56@yahoo.in',
            'BFTUzCozI_1pkPiMYp5FAE02EXsuzDqZdazVnS-JJwrczsiHTMPdPe_fYWX_x2Pho6ZozjFnZ-zJAKGR1z_XG-I',
            'RVyrCZ-Ha2ju6zHKSqwKFEMKJcvrOMZzV7v6PGKmY_A');
            return admin.database().ref('subscriptions').once('value');
            response.status(201).json({message: 'Data Stored', id: request.body.id});
        })
        .catch(function(err){
            response.status(500).json({error: err});
        })
    });
});
  