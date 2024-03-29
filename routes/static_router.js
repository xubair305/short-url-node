const express = require('express')
const router = express.Router()

const URL = require('../models/url')
const {handleGenerateUrlStatic} = require('../controllers/url')


router.get('/',  async (req, res) => {
    const allUrls = await URL.find({})
    return res.render('url', {
        urls: allUrls,
    });
})


router.post('/s/url', handleGenerateUrlStatic)

module.exports = router