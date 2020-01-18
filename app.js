const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/link', require('./routes/link.routes.js'))

const PORT = config.get('port') || 5000

async function start() {
   try {
      await mongoose.connect(config.get('mongoUri'), {
         useNewUrlParser: true,
         useUnifiedTopology: true,
         useCreateIndex: true
      })
      app.listen(PORT, () => {
         console.log(`App has been started on post ${PORT}...`)
      })
   } catch (e) {
      console.log('Server Error', e.message)
      process.exit(1)
   }
}

start()

