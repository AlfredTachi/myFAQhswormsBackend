'use strict';

const fs = require('fs');
const speechOutJson = JSON.parse(fs.readFileSync('assets/data.json', { encoding: 'utf-8' }));

var questionPossibility = require('./../constants/questionPossibility.js')
var randomizeFunction = require('./../constants/randomizeFunction.js');


const ConfirmationOfErolmentIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;

        return res.type === 'IntentRequest' &&
                res.intent.name === 'ConfirmationOfErolmentIntent';
    },
    handle(handlerInput){
        const speechOutput = speechOutJson[0].confirmationOfErolment;

         return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(randomizeFunction(questionPossibility))
                .getResponse();
    }
};

module.exports = ConfirmationOfErolmentIntentHandler;