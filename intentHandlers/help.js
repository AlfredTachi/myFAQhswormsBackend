'use strict'


const HelpIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;
        
        return res.type === 'IntentRequest' &&
                res.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput){
        const speechOutput = 'Wie kann ich Ihnen helfen';

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    }
};

module.exports = HelpIntentHandler;