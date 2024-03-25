const express = require('express')
const router = express.Router()

const {
    handleGenerateShortUrl,
    handleRedirectToOriginalURL,
} = require('../controllers/url')


router.post('/url',handleGenerateShortUrl)

router.get('/:id', handleRedirectToOriginalURL)

module.exports = router