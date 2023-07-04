const express = require('express')
const cors = require('cors')
const user = require('./routes/user.js')
const db = require('./models/index.js')

const app = express()
app.use(express.json())
app.use(cors())

//use routes
app.use('/user', user)

db.sequelize.sync() // Sync the models with the database
  .then(() => {
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  })
  .catch((error) => {
    console.error('Unable to start the server:', error);
  });