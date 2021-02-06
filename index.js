'use strict';

const Alexa = require('ask-sdk');
const AWS = require('aws-sdk');
const fs = require('fs');
const aplHelper = require('./APL/aplHelper.js');

const HELP_REPROMPT = 'wie kann ich dir helfen';
const STOP_MESSAGE = 'FAQ Hochschule Worms wird beendet! Es war großartig, Ihnen zu dienen. Auf Wiederhören!';
const speechOutJson = JSON.parse(fs.readFileSync('assets/data.json', { encoding: 'utf-8' }));


const LaunchRequestHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
        
    },
    handle(handlerInput){
        const data = require('./apl_data.json');
        const template = require('./apl_template.json');
        
        const speechOutput = 
            'yo Willkommen bei den FAQs für Studierende der Hochschule Worms. ' 
            + speechOutJson[0].intro 
            + ' Sie können zum Beispiel nach Informationen bezogen auf das Prakxis-semester fragen. '
            + 'Oder fragen, wie Sie die Prüfungsverwaltung erreichen können.';
            
        if (aplHelper.supportsAPL(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt('wie kann ich dir helfen')
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
        const speechOutput = ' Sie können die Prüfungsverwaltung per E-Mail. Unter pruefungsverwaltung. @. hs. Bindestrich. worms.de. Oder unter der Telefonnummer 0  6  2  4  1  5  0  9  1  8  1 erreichen. Möchten Sie auch wissen, wie Sie auch Ihre Immatrikulationsbescheinigung bekommen können?';
        
        if (aplHelper.supportsAPL(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt('test')
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

const ProcessingTimesOfThesesIntentHandler = require('./intentHandlers/processingTimesOfTheses.js');
const ConfirmationOfErolmentIntentHandler = require('./intentHandlers/confirmationOfErolment.js');
const HelpIntentHandler = require('./intentHandlers/help.js');
const CancelAndStopIntentHandler = require('./intentHandlers/cancelAndStop.js');
const FallbackIntentHandler = require('./intentHandlers/fallback.js');
const SessionEndedRequestHandler = require('./intentHandlers/sessionEndedRequest.js');
const IntentReflectorHandler = require('./intentHandlers/intentReflector.js');
const ErrorHandler = require('./intentHandlers/error.js');



const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        ExamServiceContactIntentHandler,
        ProcessingTimesOfThesesIntentHandler,
        ConfirmationOfErolmentIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    )
    .addErrorHandlers(ErrorHandler)
    .withCustomUserAgent('faq_hs_worms/v1.0')
    .lambda();

