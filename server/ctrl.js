let cards = require('./db.json')

module.exports = {

    getAllCards: (req, res) => {
        // Exclude the first item from the cards array
        res.status(200).send(updatedCards);
      },

    addCourt: (req,res)=>{
        req.body.id = cards[cards.length-1].id+1
        cards.push(req.body)
        res.status(200).send(cards)
    },
    deleteCourt: (req, res) => {
        const { id } = req.params;
    
        const updatedCards = cards.filter(card => card.id !== parseInt(id));
    
        if (updatedCards.length === cards.length) {
            // No court found with the specified ID
            return res.status(404).send("Court not found");
        }
    
        cards = updatedCards;
    
        res.status(200).send(cards);
    }

}