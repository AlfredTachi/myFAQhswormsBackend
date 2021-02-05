'use strict';

const HELP_REPROMPT = 'wie kann ich Ihnen helfen';
const STOP_MESSAGE = 'FAQ Hochschule Worms wird beendet! Es war großartig, Ihnen zu dienen. Auf Wiederhören!';

const fs = require('fs');
const speechOutJson = JSON.parse(fs.readFileSync('assets/data.json', { encoding: 'utf-8' }));

const ProcessingTimesOfThesesIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;

        return res.type === 'IntentRequest' &&
                res.intent.name === 'ProcessingTimesOfThesesIntent';
    },
    handle(handlerInput){
        const speechOutput = speechOutJson[0].processingTimesOfTheses;

        return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(HELP_REPROMPT)
                .getResponse();
    }
};

module.exports = ProcessingTimesOfThesesIntentHandler;