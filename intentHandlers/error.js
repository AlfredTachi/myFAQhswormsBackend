'use strict';

const ErrorHandler = {
    canHandle(){
        return true;
    },
    handle(handlerInput, error){
        const speechOutput = 'tut mir leid, ich habe Sie nicht gut verstanden.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);
        
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(speechOutput)
            .getResponse();
    }
};

module.exports = ErrorHandler;