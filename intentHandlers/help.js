'use strict'

var questionPossibility = require('./../constants/questionPossibility.js');
var randomizeFunction = require('./../constants/randomizeFunction.js');


const HelpIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;
        
        return res.type === 'IntentRequest' &&
                res.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput){
        const speechOutput = randomizeFunction(questionPossibility);

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    }
};

module.exports = HelpIntentHandler;