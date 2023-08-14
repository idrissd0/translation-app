const {Translate} = require('@google-cloud/translate').v2;
require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());


// credentials
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

app.post('/translate', async (req, res) => {
    const textToTranslate = req.body.textToTranslate;
    const targetLanguage = req.body.targetLanguage;

    try {
        const translatedText = await translateText(textToTranslate, targetLanguage);
        res.status(200).json({ translatedText });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while translating.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

translateText('Oggi è lunedì', 'en')
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    }); // this is for testing the translateText() function