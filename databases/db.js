const mysql=require('mysql');

const mysqlConnection = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Ajinkya5555",
    database:'food_delivery'
});

mysqlConnection.connect(err=>{
    if(err) console.log(err);
    else console.log("Database Connected successfully");
});

module.exports=mysqlConnection;