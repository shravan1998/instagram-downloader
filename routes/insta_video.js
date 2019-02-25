const  cheerio = require("cheerio");
const request = require("request");

module.exports = (req,res) => {
    let video_url= req.query.url;
    console.log(JSON.stringify(req.query));
    if(video_url !== undefined){
        if(video_url.substring(0,7)==='http://' || video_url.substring(0,8)==='https://'){
                request(video_url,function(error,response,body){
                    if(!error){
                        let $=cheerio.load(body);
                    
                        let title = $('meta[property="og:title"]').attr('content');
                        let url = $('meta[property="og:url"]').attr('content');
                        let video_link = $('meta[property="og:video"]').attr('content');
                        let file = $('meta[property="og:type"]').attr('content');
                        res.status(200).json({title,url,video_link,file});
                    }
                    else
                    {
                        res.status(400).json({'message':'Unable to load'});
                    }   
                });
        }
        else
        {
            res.status(201).json({'message':'Invalid URL'});
        }
    }
    else
    {
        res.status(400).json({'message':'Invalid URL'});
    }
}