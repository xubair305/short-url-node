
const ShortUniqueId = require('short-unique-id');
const URL = require('../models/url')
const checkUrl = require("url").URL;

const stringIsAValidUrl = (s) => {
  try {
    new checkUrl(s);
    return true;
  } catch (err) {
    return false;
  }
};

async function handleGenerateShortUrl(req, res){
    let body = req.body

    const isValidUrl = stringIsAValidUrl(body.url)

    if(!body.url || !isValidUrl) return res.status(404).json({status:false, message: 'Url required or invalid url'})

    const uid = new ShortUniqueId();
    const uidWithTimestamp = uid.stamp(10);

    let shortUrl = `http://localhost:3001/${uidWithTimestamp}`

    const result =  await  URL.create({redirectedUrl: body.url, shortId: uidWithTimestamp})

    if(!result) return res.status(500).json({ status : false ,message:'Server error'});
    
    return res.status(201).json({status: true, id: uidWithTimestamp, url: shortUrl})
}


async function  handleRedirectToOriginalURL (req,res){
    const shortId = req.params.id

    if(!shortId) return res.status(404).json({status: false, message: "Url not found"})

    let result =  await URL.findOneAndUpdate({shortId},{ $inc: { clicks: 1 }})

    if(!result) return res.status(404).json({status: false, message: "Url not found"})

    return res.redirect(result.redirectedUrl) 
}

module.exports = {handleGenerateShortUrl,handleRedirectToOriginalURL,}