const User = require('../models/user.models')
const { v4: uuidv4 } = require('uuid');
const {setUser} = require('../services/auth')

async function handleUserSignup(req, res){
  const { name, email, password } = req.body;
  const uid = uuidv4(); 

  const user =  await User.create({name, email, password, uid})

  return res.redirect('/')

}


async function handleUserLogin(req, res){
  const { email, password } = req.body;

  const user = await User.findOne({email, password})

  console.log(user)
  if(!user) return res.render('login',{
    error: 'Invalid username or password'
  })
  const sessionId = uuidv4(); 
  setUser(sessionId, user)
  res.cookie('uid',sessionId)
  return res.redirect('/')

}

module.exports = {
  handleUserSignup, 
  handleUserLogin, 
}