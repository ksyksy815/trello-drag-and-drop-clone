import { generateOneListItem, generateNewList } from './components/UIGenerators.js'
import { openFormToMakeNewList } from './functions/functions.js'

/*--- variables ---*/

const addListBtn = document.querySelector('#add-btn')

const dummyData = [
  {
    name: '리스트1',
    cards: [
      '카드1',
      '카드2',
      '카드3'
    ]
  },
  {
    name: '리스트2',
    cards: [
      '카드1',
      '카드2',
      '카드3'
    ]
  }
]


/*--- functions ---*/

const makeListsWithData = (data) => {
  data.forEach(list => {
    const mainListWrapper = document.querySelector('#main-list-wrapper')
    const ul = generateNewList(mainListWrapper, list.name)

    list.cards.map(card => {
      generateOneListItem(ul, card)
    })
  })
}

const initialize = () => {
  // const response = await fetch('http://localhost:4000/lists', {
  //   method: "GET",
  //   mode: "cors",
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // })
  // console.log(response.json())
  makeListsWithData(dummyData)
  
  addListBtn.addEventListener('click', openFormToMakeNewList)
}

/*--- Init ---*/

initialize()
