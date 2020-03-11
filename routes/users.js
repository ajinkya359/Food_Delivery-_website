const express = require('express');
const mySqlConnection=require('../databases/db');
const bcrypt=require('bcrypt');
const router = express.Router();


router.get('/register',(req,res)=>{
    res.sendfile('./views/register.html');
});


router.get('/logout',(req,res)=>{
    if(!req.session.user) res.send("First login");
    else{
        req.session.destroy();
        res.send("Logged out successfully");
    }
});


router.get('/login',(req,res)=>{
    if(!req.session.user)
        res.status(200).sendfile('./views/login.html');
    else res.status(401).send("You are already logged in")
});


router.post('/register',(req,res)=>{
    const {name,email,password,password2,phone}=req.body;
    let errors = [];
    if(!name||!email||!password||!password2||!phone) errors.push({msg:"Please Enter all the fields"});
    if(password!=password2) errors.push({msg:"Passwords do not match"});
    if(password.length<5) errors.push({msg:"Password must be atleast 5 characters long"});
    if(errors.length!=0) res.send(errors);
    else{
        mySqlConnection.query("select * from users where email=?",
            [email],
            (err,rows)=>{
            if(err) res.send(err);
            else if(rows.length>0) res.send("email already exist");
            else{
                pwdHash = bcrypt.hashSync(password,10);
                var values=[[name,email,pwdHash,phone]];
                mySqlConnection.query('insert into users(name ,email,pass,phone) values ?',
                    [values],
                    function (err){
                    if(err) res.send(err);
                    else res.send("Successfully Registered");
                    })
            }
            })

    }
});


router.post('/login',(req,res)=>{
    const {email,password}=req.body;
    // if(req.session.user) res.send("already logged in");
    if(!email||!password) res.send("Please enter all the fields");
    else{
        mySqlConnection.query("select * from users where email = ?",
            [email],
            (err,row)=>{
            user = row[0];
            req.session.user = user;
            if(err) res.send(err);
            else if(row.length==0) res.send("This email is not registered");
            else if(!bcrypt.compareSync(password,user.pass)) res.send("Incorrect Password");
            else res.send("You are logged in.");
            })
    }
});


module.exports = router;