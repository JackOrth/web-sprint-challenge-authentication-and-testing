const db = require('../../data/dbConfig')
const {findBy} = require('../users/users-model')

function registerInfo(req, res, next){
    if(!req.body.username || !req.body.password){
        next({
            status: 401,
            message: 'username and password required'
        })
    }else{
        next()
    }
}

async function checkUsernameExists(req, res, next){
    const user = await db('users')
        .select('username').where('username', req.body.username).first()
    if(user){
        next({
            status: 401,
            message: 'username taken'
        })
    }else{
        next()
    }   
}
const checkUserExists = async(req, res, next) => {
    try{
      const [user] = await findBy({username: req.body.username})
      if (!user){
        next({
          status: 401,
          message: 'Invalid credentials'
        })
      }else{
        req.user = user
        next()
      }
     }catch(err){
       next(err)
     }
}


module.exports = {
    registerInfo, 
    checkUsernameExists,
    checkUserExists
}