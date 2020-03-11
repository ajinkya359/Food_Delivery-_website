const express = require('express');
const bodyParser = require('body-parser');
const app=express();
const session = require('express-session');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(session({
    secret:'seCReT',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:3600000}
}));

app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'))
app.listen(5000,console.log("Connected to server"));


