const express = require('express');
const app = express();

require("dotenv").config(); 
require("./config/dbConfig");

console.log(process.env.testname);

app.listen(8082,() =>{
    console.log('Server is listening on port 8082');
})