'use strict';

const HELP_REPROMPT = 'wie kann ich dir helfen';
const STOP_MESSAGE = 'FAQ Hochschule Worms wird beendet! Es war großartig, Ihnen zu dienen. Auf Wiederhören!';



const CancelAndStopIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;

        return res.type === 'IntentRequest' &&
                (res.intent.name === 'AMAZON.CancelIntent' || res.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput){
        const speechOutput = STOP_MESSAGE;

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    }
};

module.exports = CancelAndStopIntentHandler;
