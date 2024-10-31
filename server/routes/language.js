const express = require('express');
const {translate} = require('@vitalets/google-translate-api');
const router = express.Router();
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
// router.use(cors());
const translateText = async (text) => {
    try {
        const res = await translate(text, { to: 'en' });
        return res.text; // Return the translated text
    } catch (error) {
        console.error('Error translating text:', error);
        throw error; // Throw error to be handled later
    }
};

router.post('/', async (req, res) => {
    const text = req.body.text;
    // console.log(text);
    try {
        const translatedText = await translateText(text);
        res.json({ translatedText });
    } catch (error) {
        res.status(409).json({ error: 'Error translating text' });
    }
});

module.exports = ({
    language : router
});
