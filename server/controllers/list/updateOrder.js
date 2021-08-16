module.exports = async (req, res) => {
  console.log(`카드가 드래그앤드롭 되었고 리스트에서 카드 순서 바꿔달라는 새로운 요청 들어왔음.`)
  res.status(200).send({message: "OK"})
}