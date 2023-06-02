const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {getAllCards, addCourt, deleteCourt} = require('./ctrl')

app.get("/api/cards",getAllCards)
app.post("/api/court",addCourt)
app.delete("/api/court/:id",deleteCourt)




app.listen(4500, ()=> console.log('SERVER RUNNING ON PORT 4500'))

