const express = require('express');
const path = require('path');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/database');
const routes = require('./routes/routes');


const app = express();
mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{

    console.log("Connected to database..."+config.database);

})
mongoose.connection.on('error',()=>{

    console.log("Connection to "+config.database+" failed...");
})

app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static((__dirname, "public")))
app.use(cors());
app.use('/routes',routes);
/*
app.get("*", (req,res)=>{

    res.sendFile(path.join(__dirname, 'public/index.html'));


})
*/
const port = '3000';

const server = http.createServer(app)

server.listen(port,()=>{

    console.log("Server Listening at port "+port);

})