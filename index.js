'use strict';

const Alexa = require('ask-sdk');
const AWS = require('aws-sdk');
const fs = require('fs');

const aplHelper = require('./APL/aplHelper.js');
var questionPossibility = require('./constants/questionPossibility.js')
var randomizeFunction = require('./constants/randomizeFunction.js');

const ProcessingTimesOfThesesIntentHandler = require('./intentHandlers/processingTimesOfTheses.js');
const ConfirmationOfErolmentIntentHandler = require('./intentHandlers/confirmationOfErolment.js');
const HelpIntentHandler = require('./intentHandlers/help.js');
const RepeatIntentHandler = require('./intentHandlers/repeat.js');
const saveResponseForRepeatingInterceptor = require('./intentHandlers/repeatingInterceptor.js');
const CancelAndStopIntentHandler = require('./intentHandlers/cancelAndStop.js');
const FallbackIntentHandler = require('./intentHandlers/fallback.js');
const SessionEndedRequestHandler = require('./intentHandlers/sessionEndedRequest.js');
const IntentReflectorHandler = require('./intentHandlers/intentReflector.js');
const ErrorHandler = require('./intentHandlers/error.js');

const speechOutJson = JSON.parse(fs.readFileSync('assets/data.json', { encoding: 'utf-8' }));


const LaunchRequestHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
        
    },
    handle(handlerInput){
        
        const data = require('./apl_data.json');
        const template = require('./apl_template.json');
        
        const speechOutput = 
            'Willkommen bei den FAQs für Studierende der Hochschule Worms. ' 
            + speechOutJson[0].intro 
            + randomizeFunction(questionPossibility);
            
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

// IntentHandlers
const ExamServiceContactIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;

        return res.type === 'IntentRequest' &&
                res.intent.name === 'ExamServiceContactIntent';
    },
    handle(handlerInput){
        const data = require('./APL/contact_data.json');
        const template = require('./APL/contact_template.json');
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



const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        ExamServiceContactIntentHandler,
        ProcessingTimesOfThesesIntentHandler,
        ConfirmationOfErolmentIntentHandler,
        HelpIntentHandler,
        RepeatIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    )
    .addResponseInterceptors(saveResponseForRepeatingInterceptor)
    .addErrorHandlers(ErrorHandler)
    .withCustomUserAgent('faq_hs_worms/v1.0')
    .lambda();

