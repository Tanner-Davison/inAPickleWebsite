const cards = require('./db.json')

module.exports = {

    getAllCards: (req, res)=>{
        res.status(200).send(cards)
    }

}