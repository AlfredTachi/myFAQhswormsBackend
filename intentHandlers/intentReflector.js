'use strict';

const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = handlerInput.requestEnvelope.request.intent.name;
        const speakOutput = `${intentName} wurde gerade ausgelöst`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};

module.exports = IntentReflectorHandler;