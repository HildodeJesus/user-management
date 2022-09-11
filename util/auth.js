const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  let token = req.headers['authorization']

  try {
    let verify = jwt.verify(token, process.env.KEY_JWT)

    if(Date.now() >= verify.exp * 1000) throw 'Dados expirados';
    
    next()
  } catch(err) {
    res.status(400).json({erro: err})
  }
  
}

module.exports = auth