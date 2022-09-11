const {Sequelize} = require('sequelize')

const connectDB = new Sequelize('loginsystem', 'root', '245524', {
    host: 'localhost',
    dialect: 'mariadb'
})

module.exports = connectDB