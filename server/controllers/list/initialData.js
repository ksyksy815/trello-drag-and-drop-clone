const fs = require('fs').promises

module.exports = async (req, res) => {
  const initialData = await fs.readFile('data/data.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err)
    } else {
      return data
    }
  })
  
  res.status(200).send({
    initialData
  })
}