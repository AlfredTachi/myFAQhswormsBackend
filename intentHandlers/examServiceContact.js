'use strict';

const aplHelper = require('./../APL/aplHelper.js');
const fs = require('fs');
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
        const template = require('./../APL/contactTemplate.json');
        const  speechOutput = speechOutJson[0].examServiceContact + randomizeFunction(questionPossibility);
        
        //const speechOutput = ' Sie können die Prüfungsverwaltung per E-Mail. Unter pruefungsverwaltung. @. hs. Bindestrich. worms.de. Oder unter der Telefonnummer 0  6  2  4  1  5  0  9  1  8  1 erreichen. Möchten Sie auch wissen, wie Sie auch Ihre Immatrikulationsbescheinigung bekommen können?';
        
        if (aplHelper.supportsAPL(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(randomizeFunction(questionPossibility))
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.1',
                    document: template,
                    token: 'FAQsHSwormsTokens',
                    datasources: data
                })
                .getResponse();
        }
    }
};

module.exports = ExamServiceContactIntentHandler;