
const express = require('express');
const app = express();

const {PubSub} = require('@google-cloud/pubsub');
const pubSubClient = new PubSub();
const  topicNameOrId = 'workload-identity-test';

let data = JSON.stringify({"employees":{"employee":[{"id":"1","firstName":"Tom","lastName":"Cruise"},{"id":"2","firstName":"Maria","lastName":"Sharapova"},{"id":"3","firstName":"James","lastName":"Bond"}]}});
const dataBuffer = Buffer.from(data);

app.get('/publish', (req,res) => {
	pubSubClient
        .topic(topicNameOrId)
        .publish(dataBuffer).then( (messageId) => {
        	console.log(`Message ${messageId} published.`);
        	res.status(200).send(`Message ${messageId} published.`);
        }, (error) => {
        	console.error(`Received error while publishing: ${error.message}`);
        	res.status(500).send(`Received error while publishing: ${error.message}`);
        });
});

const appPort = process.env.PORT || 5050;

app.listen(appPort, '0.0.0.0', function() {
  console.log(' server started, listening on port', appPort);
});
