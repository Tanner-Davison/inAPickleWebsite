const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {getAllCards} = require('./ctrl')

app.get("/api/cards",getAllCards)





app.listen(4500, ()=> console.log('SERVER RUNNING ON PORT 4500'))

