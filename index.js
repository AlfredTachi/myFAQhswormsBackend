const Alexa = require('ask-sdk');
const AWS = require('aws-sdk');
const fs = require('fs');
const util = require('./util')
const aplHelper = require('./APL/aplHelper.js');

const dataJson = JSON.parse(fs.readFileSync('assets/data.json', { encoding: 'utf-8' }));

const LaunchRequestHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
        
    },
    handle(handlerInput){
        const data = require('./APL/data.json');
        const template = require('./APL/template.json');
        
        console.log(dataJson);
        
        const speechOutput = 
            'Willkommen bei den FAQs für Studierende der Hochschule Worms. ' 
            + dataJson[0].intro 
            + ' Sie können zum Beispiel nach Informationen bezogen auf das Prakxis-semester fragen. '
            + 'Oder fragen, wann das Semesterende ist.';
            
        if (aplHelper.supportsAPL(handlerInput)) {
            return handlerInput.responseBuilder
                .speak(speechOutput)
                .reprompt(HELP_REPROMPT)
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

const TestIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;

        return res.type === 'IntentRequest' &&
                res.intent.name === 'TestIntent';
    },
    handle(handlerInput){
        const speechOutput = dataJson[0].periodOfStudy;

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(HELP_REPROMPT)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;
        
        return res.type === 'IntentRequest' &&
                res.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput){
        const speechOutput = HELP_REPROMPT;

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;

        return res.type === 'IntentRequest' &&
                (res.intent.name === 'AMAZON.CancelIntent' || res.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput){
        const speechOutput = STOP_MESSAGE;

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    }
};

const FallbackIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;
        
        return res.type === 'IntentRequest' &&
                res.intent.name === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput){
        const speechOutput = 'Ich bin leider nicht sicher.';
        
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};


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


const ErrorHandler = {
    canHandle(){
        return true;
    },
    handle(handlerInput, error){
        const speechOutput = 'tut mir leid, ich habe dich nicht gut verstanden.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);
        
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    }
};

const HELP_REPROMPT = 'wie kann ich dir helfen';
const STOP_MESSAGE = 'FAQ Hochschule Worms wird beendet! Es war großartig, dir zu dienen. Auf Wiederhören!';


const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
    .addRequestHandlers(
        LaunchRequestHandler,
        TestIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    )
    .addErrorHandlers(ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();

