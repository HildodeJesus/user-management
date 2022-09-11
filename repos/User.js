const { v4 } = require('uuid')
const UserModel = require('../model/User')

class User {

  async Save(user, id) {
    try {
      if(id) {
        await UserModel.update(user, {where: {id: id}})
        return true
      } else {
        user.id = v4()
        await UserModel.create(user)
        return true
      }
    } catch(err) {
      return
    }
  }

  async Delete(id) {
    try{
      await UserModel.destroy({where: {id: id}})
      return true
    } catch(err) {
      return 
    }
  }
  
  async GetAll() {
    try {
      const users = await UserModel.findAll({raw:true})
      return users
    } catch(err) {
      return
    }
    

  }

  async GetForId(id) {
    try {
      const user = await UserModel.findByPk(id, {raw: true})
      return user
    } catch(err) {
      return 
    }
  }

  async GetForEmail(email) {
    try {
      const user = await UserModel.findOne({where: {email: email}, limit: 1, raw: true})
      return user
    } catch(err) {
      return 
    }
  }
}

module.exports = User