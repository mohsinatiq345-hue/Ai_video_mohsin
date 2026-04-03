const express = require('express');
const multer = require('multer');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const upload = multer();

// Note: API Key hum Render ki settings mein dalenge, yahan likhne ki zaroorat nahi
const REPLICATE_API_KEY = process.env.REPLICATE_API_KEY;

app.post('/api/generate', upload.any(), async (req, res) => {
    try {
        const { prompt, lang, duration } = req.body;
        
        // Translation logic
        const tRes = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(prompt)}&langpair=${lang}|en`);
        const tData = await tRes.json();
        const finalPrompt = tData.responseData.translatedText + ", realistic, cinematic, 4k";

        // Replicate Prediction
        const response = await fetch("https://api.replicate.com/v1/predictions", {
            method: "POST",
            headers: { 
                "Authorization": `Token ${REPLICATE_API_KEY}`, 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ 
                version: "4404e990cc690113b854988f594d59ad0243c859d0400ebb10be96078d22fd6a", 
                input: { prompt: finalPrompt, num_frames: Number(duration) * 8 } 
            }),
        });

        const prediction = await response.json();
        res.json({ prediction_id: prediction.id, poll_url: prediction.urls.get });
        
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
