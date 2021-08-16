const { data, setData } = require('../../data/data.js')

module.exports = async (req, res) => {
  const listId = req.params.id;
  const updatedList = req.body
  
  setData(data.map(list => {
    if (list.id === listId) {
      return {
        ...list,
        cards: updatedList
      };
    } else {
      return list;
    }
  }))

  res.status(200).send({message: "OK"})
}