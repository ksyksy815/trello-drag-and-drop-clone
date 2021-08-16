const uuid = require('uuid').v4

module.exports = {
  createCard: async (req, res) => { 
    const { listId, content } = req.body
    console.log(`새로운 카드 생성 요청: `, content)
    
    const newCard = {
      id: uuid(),
      content
    }
    
    res.status(201).send({id: newCard.id})

    // data.json 파일에 저장하는 로직입니다
  }
}