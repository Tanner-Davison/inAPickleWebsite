const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const {getAllCards, addCourt, deleteCourt,updateCourt} = require('./ctrl')

app.get("/api/cards",getAllCards)
app.post("/api/court",addCourt)
app.delete("/api/court/:id",deleteCourt)
app.put("/api/court/:id",updateCourt)



app.listen(4500, ()=> console.log('SERVER RUNNING ON PORT 4500'))

