const express = require('express');
const cors = require("cors");
const app = express();
require("dotenv").config(); 
require("./config/dbConfig");

const userRoute = require('./routes/userRoutes');

app.use(cors());
app.use(express.json());
app.use('/',userRoute);

app.listen(8082,() =>{
    console.log('Server is listening on port 8082');
})