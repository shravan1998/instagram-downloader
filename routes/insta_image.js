const  cheerio = require("cheerio");
const request = require("request");

module.exports = (req,res) => {
    let img_url= req.query.url;
    console.log(JSON.stringify(req.query));
    if(img_url !== undefined){
        if(img_url.substring(0,7)==='http://' || img_url.substring(0,8)==='https://'){
                request(img_url,function(error,response,body){
                    if(!error){
                        let $=cheerio.load(body);
                    
                        let title = $('meta[property="og:title"]').attr('content');
                        let url = $('meta[property="og:url"]').attr('content');
                        let image_link = $('meta[property="og:image"]').attr('content');
                        let file = $('meta[property="og:type"]').attr('content');
                        res.status(200).json({title,url,image_link,file});
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