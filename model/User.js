const sequelize = require('sequelize')
const connectDB = require('../db/connect')

const User = connectDB.define('User', {
  id: {
    type: sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: sequelize.STRING,
    allowNull: false
  },
  email: {
    type: sequelize.STRING,
    allowNull: false
  },
  password: {
    type: sequelize.STRING,
    allowNull: false
  }
})

User.sync({force: false})

module.exports = User