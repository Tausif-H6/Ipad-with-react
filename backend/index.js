const connectToMongo= require('./db');
const express = require('express')
var cors = require('cors');


connectToMongo();
const app = express()
const port = 5000

// app.get('/', (req, res) => {
//   res.send('Hello Tausif Hossain!')
// })
//If we want to send something in the body of a request.
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
