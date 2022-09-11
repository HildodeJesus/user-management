const bcrypt = require('bcrypt')
const {v4} = require('uuid')
const jwt = require('jsonwebtoken')
const User = require('../repos/User')

const existsOrNot = require('../util/verification')

const createNewUser = async (req, res) => {
  let userRepo = new User()
  const userCopy = {...req.body}

  try {
    existsOrNot(userCopy.name, [400, 'Nome não definido'])
    existsOrNot(userCopy.email, [400, 'E-mail não definido'])
    existsOrNot(userCopy.password, [400, 'Senha não definido'])

    let userFromDB = await userRepo.GetForEmail(userCopy.email)

    if(userFromDB == null) {
      let salt = await bcrypt.genSalt(11)
      userCopy.password = await bcrypt.hash(userCopy.password, salt)

      await userRepo.Save(userCopy)

      return res.status(200).json()
    } else {
      throw [400, 'E-mail já foi usado!!']
    }

    
  } catch(err) {
    return res.status(err[0]).json({error: err[1]})
  }

}

const login = async (req, res) => {
  let userRepo = new User()
  let userCopy = {...req.body}
  try {
    existsOrNot(userCopy.email, [400, 'E-mail não definido'])
    existsOrNot(userCopy.password, [400, 'Senha não definido'])

    let userFromDB = await userRepo.GetForEmail(userCopy.email)
    if (userFromDB == null) {
      throw [400, 'Conta inexistente']
    }

    const compare = await bcrypt.compare(userCopy.password, userFromDB.password)

    let payload = {
      id: userFromDB.id, 
      name: userFromDB.name,
      email: userFromDB.email
    }

    if(compare) {
      let token = jwt.sign(payload, process.env.KEY_JWT, {expiresIn: '72h'})

      res.json({token})
    }

  } catch(err) {
    return res.status(err[0]).json({error: err[1]})
  }
} 

const deleteUser = async (req, res) => {
  let id = req.params.id
  try {
    existsOrNot(id, [400, 'Id não adicionado'])

    await new User().Delete(id)

    res.status(200).json()
  } catch(err) {
    return res.status(err[0]).json({error: err[1]})
  }
}

module.exports = {
  createNewUser,
  deleteUser,
  login
}