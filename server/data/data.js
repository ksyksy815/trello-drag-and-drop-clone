module.exports = {
  data: [
    {
      id: "111",
      name: "예제 리스트1",
      cards: [
        {
          id: "123",
          content: "카드1"
        },
        {
          id: "456",
          content: "카드2"
        },
        {
          id: "789",
          content: "카드3"
        }
      ]
    },
    {
      id: "222",
      name: "예제 리스트2",
      cards: [
        {
          id: "321",
          content: "카드1"
        },
        {
          id: "654",
          content: "카드2"
        },
        {
          id: "987",
          content: "카드3"
        }
      ]
    }
  ],
  setData: ( newData ) => {
    data = newData
    console.log(`데이터가 성공적으로 변경되었습니다!`)
  }
}