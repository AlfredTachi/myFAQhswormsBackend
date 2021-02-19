'use strict';

const fs = require('fs');
const aplHelper = require('./../APL/aplHelper.js');
var questionPossibility = require('./../constants/questionPossibility.js');
var randomizeFunction = require('./../constants/randomizeFunction.js');
const speechOutJson = JSON.parse(fs.readFileSync('assets/data.json', { encoding: 'utf-8' }));

const ExamServiceContactIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;

        return res.type === 'IntentRequest' &&
                res.intent.name === 'ExamServiceContactIntent';
    },
    handle(handlerInput){
        const data = require('./../APL/contactData.json');
        const template = require('./../APL/longTextTemplate.json');
        const  speechOutput = speechOutJson[0].examServiceContact + randomizeFunction(questionPossibility);
        
        if (aplHelper.supportsAPL(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(randomizeFunction(questionPossibility))
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.4',
                    document: template,
                    token: 'FAQsHSwormsTokens',
                    datasources: data
                })
                .getResponse();
        }
    }
};

module.exports = ExamServiceContactIntentHandler;