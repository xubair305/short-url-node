const {getUser} = require('../services/auth')
const User = require('../models/user.models')

async function restrictToLoggedInUserOnly(req, res, next) {
    const token = req.cookies?.uid
    if(!token) return res.redirect('/login')

    const payload  = getUser(token)
    if(!payload)  return res.redirect('/login')
    const userData = await User.findOne({_id : payload.id})
    console.log(userData)

    if(!userData) return res.redirect('/login')

    req.user = userData
    next()
}

module.exports = {restrictToLoggedInUserOnly}