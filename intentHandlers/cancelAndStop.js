'use strict';

const aplHelper = require('./../APL/aplHelper.js');
var goodByeMessage = require('./../constants/goodByeMessage.js');
var randomizeFunction = require('./../constants/randomizeFunction.js');

const CancelAndStopIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;

        return res.type === 'IntentRequest' &&
                (res.intent.name === 'AMAZON.CancelIntent' || res.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput){
        
        const data = require('./../APL/endData.json');
        const template = require('./../APL/launchTemplate.json');
        
        const speechOutput = randomizeFunction(goodByeMessage);
            
        if (aplHelper.supportsAPL(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.4',
                    document: template,
                    token: 'FAQsHSwormsToken',
                    datasources: data
                })
                .getResponse();
        }
    }
};

module.exports = CancelAndStopIntentHandler;
