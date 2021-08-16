const uuid = require('uuid').v4
const { data, setData } = require('../../data/data.js')

module.exports = async (req, res) => {
  const newList = req.body

  const id = uuid()
  newList.id = id

  const newData = [...data, newList]
  setData(newData)
  
  res.status(201).send({id: id})
}