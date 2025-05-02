const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const app = express();
require('dotenv').config();


const APP_ID = process.env.APP_ID;
const APP_SECRET = process.env.APP_SECRET;
const BASE_URL = 'https://api.apsystemsema.com:9282';

app.get('/api/summary/:sid', async (req, res) => {
    try {
        const { sid } = req.params;
        const timestamp = Date.now().toString();
        const nonce = crypto.randomUUID();
        const method = 'GET';
        const requestPath = 'summary';
        const signatureMethod = 'HmacSHA256';

        const stringToSign = `${timestamp}/${nonce}/${APP_ID}/${requestPath}/${method}/${signatureMethod}`;

        const hmac = crypto.createHmac('sha256', APP_SECRET);
        hmac.update(stringToSign);
        const signature = hmac.digest('base64');

        const headers = {
            'X-CA-AppId': APP_ID,
            'X-CA-Timestamp': timestamp,
            'X-CA-Nonce': nonce,
            'X-CA-Signature-Method': signatureMethod,
            'X-CA-Signature': signature,
        };

        const apsystemsUrl = `${BASE_URL}/user/api/v2/systems/summary/${sid}`;
        const response = await axios.get(apsystemsUrl, { headers });

        res.json(response.data);
    } catch (err) {
        console.error(err.response?.data || err.message);
        res.status(500).json({ error: 'Failed to fetch summary data' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
