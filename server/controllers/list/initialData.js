const initialData = require('../../data/data.js')

module.exports = async (req, res) => {
  res.status(200).send({
    initialData: initialData.data
  })
}