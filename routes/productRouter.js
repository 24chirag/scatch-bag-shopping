const express = require("express");
const router = express.Router();
const multer = require('multer')
const storage = multer.diskStorage();
const upload = multer({storage:storage})




router.post("/create",upload.single("image"),function(req,res){
    res.send(req.file)
})



module.exports=router