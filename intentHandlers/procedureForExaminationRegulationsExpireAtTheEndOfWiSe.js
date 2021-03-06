'use strict';

const fs = require('fs');
const aplHelper = require('./../APL/aplHelper.js');
const speechOutJson = JSON.parse(fs.readFileSync('assets/data.json', { encoding: 'utf-8' }));

var questionPossibility = require('./../constants/questionPossibility.js')
var randomizeFunction = require('./../constants/randomizeFunction.js');


const ProcedureForExaminationRegulationsExpireAtTheEndOfWiSeIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;

        return res.type === 'IntentRequest' &&
                res.intent.name === 'ProcedureForExaminationRegulationsExpireAtTheEndOfWiSeIntent';
    },
    handle(handlerInput){
        
        const data = require('./../APL/procedureForExaminationRegulationsExpireAtTheEndOfWiSeData.json');
        const template = require('./../APL/longTextTemplate.json');
        
        const speechOutput = speechOutJson[0].procedureForExaminationRegulationsExpireAtTheEndOfWiSe + randomizeFunction(questionPossibility);
            
        if (aplHelper.supportsAPL(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(randomizeFunction(questionPossibility))
                .addDirective({
                    type: 'Alexa.Presentation.APL.RenderDocument',
                    version: '1.1',
                    document: template,
                    token: 'FAQsHSwormsToken',
                    datasources: data
                })
                .getResponse();
        }
    }
};

module.exports = ProcedureForExaminationRegulationsExpireAtTheEndOfWiSeIntentHandler;