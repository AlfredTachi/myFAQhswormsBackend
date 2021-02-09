'use strict';

var goodByeMessage = require('./../constants/goodByeMessage.js');
var randomizeFunction = require('./../constants/randomizeFunction.js');

const CancelAndStopIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;

        return res.type === 'IntentRequest' &&
                (res.intent.name === 'AMAZON.CancelIntent' || res.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput){
        const speechOutput = randomizeFunction(goodByeMessage);

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    }
};

module.exports = CancelAndStopIntentHandler;
