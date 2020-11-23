const Alexa = require('ask-sdk');
const AWS = require('aws-sdk');
const fs = require('fs');


const LaunchRequestHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
        
    },
    handle(handlerInput){
        const speechOutput = 'Mamba test 2 Willkommen bei den FAQs für Studierende der Hochschule Worms. Fragen rund ums Studium werden hier gesammelt, beantwortet und Ihnen zur Verfügung gestellt. Wir erweitern diese Liste ständig, so dass Sie schneller an nötige Antworten kommen.';

        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(HELP_REPROMPT)
            .getResponse();

    }
};

const TestIntentHandler = {
    canHandle(handlerInput){
        const res = handlerInput.requestEnvelope.request;

        return res.type === 'IntentRequest' &&
                res.intent.name === 'TestIntent';
    },
    handle(handlerInput){
        const dataJson = JSON.parse(fs.readFileSync('data.json', { encoding: 'utf-8' }));
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
const STOP_MESSAGE = 'Es war großartig, dir zu dienen. Auf Wiederhören!';

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

