const express = require('express');
const PORT = process.env.PORT || 5000;
require('dotenv').config();
const connectDB = require('./Config/configDB');
const userRoute = require('./User/userRoute');

connectDB();
const app = express();

app.use(express.json());


// All Router 

app.use('/api/users', userRoute);



app.get('/', (req, res) => {
    res.send('Welcome Server side');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
