'use strict'

const RepeatIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;
        
        return res.type === 'IntentRequest' &&
                res.intent.name === 'AMAZON.RepeatIntent';
    },
    handle(handlerInput){
        // Get the session attributes.
        const sessionAttributes = handlerInput.attributesManager.getSessionAttributes(); 
        const { lastResponse } = sessionAttributes;
        const speakOutput = lastResponse;
        
   return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

module.exports = RepeatIntentHandler;