const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>res.sendfile('./views/login.html'));

module.exports = router;