const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

app.use(bodyParser.json());

// Import Routes / Middleware (can have multiple of these)
const postsRoute = require('./routes/posts');
app.use(cors());
app.use('/posts', postsRoute);


// ROUTES
app.get('/', (req, res) => {
    res.send('We are Home');
});

//connect to DB
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true }, () => 
    console.log('connectected to DB!')
);

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});

// how to start listeninng to the server
app.listen(3000);