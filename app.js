require('dotenv').config()
const port = process.env.PORT || 9000

const express = require('express') 
const bodyParser = require('body-parser')
const cors = require('cors')

cors()
const app = express()

const router = require('./routes')
const connectDB = require('./db/connect')
const UserModel = require('./model/User')

// app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/1.0/', router)

const start = async () => {
  try {
      await connectDB.authenticate().then(console.log)
      app.listen(port, console.log(`Serve listening of the port ${port}`))
  } catch(err) {
      console.log(err)
  }
}

start()