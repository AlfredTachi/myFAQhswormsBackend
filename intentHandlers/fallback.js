'use strict';

const FallbackIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;
        
        return res.type === 'IntentRequest' &&
                res.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput){
        const speechOutput = 'Tut mir leid, ich weiß nicht darüber. Bitte versuchen Sie es noch mal.';
        
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    }
};

module.exports = FallbackIntentHandler;