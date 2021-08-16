const fs = require('fs').promises
const uuid = require('uuid').v4

module.exports = async (req, res) => {
  const newList = req.body
  const id = uuid()
  res.status(201).send({id: id})

  // data.json파일에 변경 사항을 저장하는 로직입니다
  // const previousData = await fs.readFile('data/data.json', 'utf8', (err, data) => {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     return data
  //   }
  // })
  // .then(data => JSON.parse(data))

  // const newData = [...previousData, newList]

  // await fs.writeFile('data/data.json', JSON.stringify(newData, null, 2))
  // .then(() => {
  //   res.status(201).send({message: "A new list has been successfully created."})
  // })

}