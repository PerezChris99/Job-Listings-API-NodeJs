const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//middleware
app.use(bodyParser.json());

//mongodb connection
mongoose.connect('mongodb://localhost:27017/jobListings', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=>{
    console.log('Connected to MongoDB');
});

//starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});

//routes
const jobRoutes = require('./routes/jobs');
app.use('/api/jobs', jobRoutes);
