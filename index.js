'use strict';

const Alexa = require('ask-sdk');
const AWS = require('aws-sdk');
const fs = require('fs');

const aplHelper = require('./APL/aplHelper.js');
var questionPossibility = require('./constants/questionPossibility.js');
var randomizeFunction = require('./constants/randomizeFunction.js');

const speechOutJson = JSON.parse(fs.readFileSync('assets/data.json', { encoding: 'utf-8' }));

const LaunchRequestHandler = {
    canHandle(handlerInput){
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
        
    },
    handle(handlerInput){
        
        const data = require('./APL/launchData.json');
        const template = require('./APL/launchTemplate.json');
        
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
const ExamServiceContactIntentHandler = require('./intentHandlers/examServiceContact.js');
const ProcessingTimesOfThesesIntentHandler = require('./intentHandlers/processingTimesOfTheses.js');
const ConfirmationOfErolmentIntentHandler = require('./intentHandlers/confirmationOfErolment.js');
const StudentServiceContactIntentHandler = require('./intentHandlers/studentServiceContact.js');
const ExamReviewsIntentHandler = require('./intentHandlers/examReviews.js');
const ExamforWinterToSommerIntentHandler = require('./intentHandlers/examforWinterToSommer.js');
const CertificatesCreationIntentHandler = require('./intentHandlers/certificatesCreation.js');
const CertificateToDriveToWormsExaminationPhaseIntentHandler = require('./intentHandlers/certificateToDriveToWormsExaminationPhase.js');
const RegistrationOfInternshipSemestersOrTheseIntentHandler = require('./intentHandlers/registrationOfInternshipSemestersOrThese.js');
const SemesterReregistrationIntentHandler = require('./intentHandlers/semesterReregistration.js');
const ThesesSubmissionIntentHandler = require('./intentHandlers/thesesSubmission.js');
const InfoToFuenfZehnKmRegelIntentHandler = require('./intentHandlers/infoTo15KmRegel.js');
const StudentIdValidationIntentHandler = require('./intentHandlers/studentIdValidation.js');
const NewStudentIdCardIntentHandler = require('./intentHandlers/newStudentIdCard.js');
const EquivalenceOfStudentIdIntentHandler = require('./intentHandlers/equivalenceOfStudentId.js');
const CompensationForInternshipSemestersIntentHandler = require('./intentHandlers/compensationForInternshipSemesters.js');
const ProcedureForExaminationRegulationsExpireAtTheEndOfWiSeIntentHandler = require('./intentHandlers/procedureForExaminationRegulationsExpireAtTheEndOfWiSe.js');
const HygieneConceptIntentHandler = require('./intentHandlers/hygieneConcept.js');
const NormalPeriodOfStudyIntentHandler = require('./intentHandlers/normalPeriodOfStudy.js');

const HelpIntentHandler = require('./intentHandlers/help.js');
const RepeatIntentHandler = require('./intentHandlers/repeat.js');
const saveResponseForRepeatingInterceptor = require('./intentHandlers/repeatingInterceptor.js');
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
        StudentServiceContactIntentHandler,
        ExamReviewsIntentHandler,
        ExamforWinterToSommerIntentHandler,
        CertificatesCreationIntentHandler ,
        CertificateToDriveToWormsExaminationPhaseIntentHandler,
        RegistrationOfInternshipSemestersOrTheseIntentHandler,
        SemesterReregistrationIntentHandler,
        ThesesSubmissionIntentHandler,
        InfoToFuenfZehnKmRegelIntentHandler,
        StudentIdValidationIntentHandler,
        NewStudentIdCardIntentHandler,
        EquivalenceOfStudentIdIntentHandler,
        CompensationForInternshipSemestersIntentHandler,
        ProcedureForExaminationRegulationsExpireAtTheEndOfWiSeIntentHandler,
        HygieneConceptIntentHandler,
        NormalPeriodOfStudyIntentHandler,
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

