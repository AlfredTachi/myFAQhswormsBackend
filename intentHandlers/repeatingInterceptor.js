'use strict';

// intercepting and saving the Response for repeating later
const saveResponseForRepeatingInterceptor = {  
    process( handlerInput ) {
        const response = handlerInput.responseBuilder.getResponse().outputSpeech.ssml;
     
        const sessionAttributes =  handlerInput.attributesManager.getSessionAttributes();
     
     sessionAttributes.lastResponse = response;     
     handlerInput.attributesManager.setSessionAttributes(sessionAttributes);
},};

module.exports = saveResponseForRepeatingInterceptor;