'use strict';

const HELP_REPROMPT = 'wie kann ich dir helfen';
const STOP_MESSAGE = 'FAQ Hochschule Worms wird beendet! Es war großartig, dir zu dienen. Auf Wiederhören!';


const fs = require('fs');
const speechOutJson = JSON.parse(fs.readFileSync('assets/data.json', { encoding: 'utf-8' }));


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
                .reprompt(HELP_REPROMPT)
                .getResponse();
    }
};

module.exports = ConfirmationOfErolmentIntentHandler;