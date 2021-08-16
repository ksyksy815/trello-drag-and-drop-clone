const uuid = require('uuid').v4
const { data, setData } = require('../../data/data.js')

module.exports = {
  createCard: async (req, res) => { 
    const { listId, content } = req.body

    const newCard = {
      id: uuid(),
      content
    }

    const newData = data.map( prevList => 
      prevList.id === listId ? [...prevList.cards, newCard] : prevList
    )

    setData(newData)

    res.status(201).send({id: newCard.id})
  }
}