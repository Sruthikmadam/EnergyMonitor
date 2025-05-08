
// const express = require('express');
// const crypto = require('crypto');
// const axios = require('axios');
// const mongoose = require('mongoose');
// const auth = require('./routes/auth');
// const authRoutes = require('./routes/authRoutes');
// const deviceRoutes = require('./routes/device');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');


// const app = express();

// const APP_ID = process.env.APP_ID;
// const APP_SECRET = process.env.APP_SECRET;
// const BASE_URL = 'https://api.apsystemsema.com:9282';

// app.use(express.json());
// require('dotenv').config();  
// app.use(cors());
// app.use(express.json());

// app.use('/api', authRoutes);
// app.use('/api', deviceRoutes);


const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

dotenv.config();
const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials (cookies)
  }));
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI)
//  , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
.then(() => console.log('MongoDB connected!'))
.catch((err) => console.error('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('MongoDB Atlas is working!');
});


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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
