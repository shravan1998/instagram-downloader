const express = require("express");
const app = express();
//const crawler =  require("");
const bodyParser = require("body-parser");
let insta_video = require("./routes/insta_video");
let insta_image = require("./routes/insta_image");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
});
app.get('/',function(req,res){
    res.send("Ready When You Are");
});
app.get('/instagram/video',insta_video);
app.get('/instagram/image',insta_image);
app.listen(8000,function(){
    console.log("Initialized");
});