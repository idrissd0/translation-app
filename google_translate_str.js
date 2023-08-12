const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();

// Your credentials
const CREDENTIALS = require('./nodejstranslator-395716-0c8c5b9eb887.json');

// Configuration for the client
const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
});

const detectLanguage = async (text) => {

    try {
        let response = await translate.detect(text);
        return response[0].language;
    } catch (error) {
        console.log(`Error at detectLanguage --> ${error}`);
        return 0;
    }
} //this funciton isi to detect the language of the input text

// detectLanguage('Oggi è lunedì')
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     }
// ); // this is for testing the detectLanguage() function

const translateText = async (text, targetLanguage) => {

    try {
        let [response] = await translate.translate(text, targetLanguage);
        return response;
    } catch (error) {
        console.log(`Error at translateText --> ${error}`);
        return 0;
    }
}; // here this function accepts two args, the text and the target language you want to translate the text to

translateText('Oggi è lunedì', 'en')
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    }); // this is for testing the translateText() function