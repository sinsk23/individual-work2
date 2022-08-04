const express = require("express");
const router = express.Router();

//index생략가능
router.get("/",(req,res)=>{
    res.send("Main page");
});


module.exports = router;