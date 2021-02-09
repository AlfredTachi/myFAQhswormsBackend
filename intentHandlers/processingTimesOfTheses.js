'use strict';

var questionPossibility = require('./../constants/questionPossibility.js')
var randomizeFunction = require('./../constants/randomizeFunction.js');

const fs = require('fs');
const speechOutJson = JSON.parse(fs.readFileSync('assets/data.json', { encoding: 'utf-8' }));

const ProcessingTimesOfThesesIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;

        return res.type === 'IntentRequest' &&
                res.intent.name === 'ProcessingTimesOfThesesIntent';
    },
    handle(handlerInput){
        const speechOutput = speechOutJson[0].processingTimesOfTheses + randomizeFunction(questionPossibility);

        return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(randomizeFunction(questionPossibility))
                .getResponse();
    }
};

module.exports = ProcessingTimesOfThesesIntentHandler;