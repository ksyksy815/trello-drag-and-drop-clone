import { 
  generateBtnToAddCard, 
  generateNewList,
  generateFormToAddNewCard, 
  generateOneListItem,
  generateFormToMakeNewList
} from '../components/UIGenerators.js'
import { 
  requestToCreateNewList,
  requestToMakeNewCard,
  requestToUpdateOrder
} from './requests.js'
import { listData, setListData, dragData, setDragData } from '../globalStates.js'

export const makeListsWithData = (data) => {
  data.forEach(list => {
    const mainListWrapper = document.querySelector('#main-list-wrapper')
    const ul = generateNewList(mainListWrapper, list)
    addDragOverListener(ul)

    list.cards.map( card => {
      generateOneListItem(ul, card.content, card.id)
    })
  })
}

export const makeNewList = async (e) => {
  e.preventDefault()

  const id = await requestToCreateNewList(e.target[0].value)
  const newList = {
    id,
    name: e.target[0].value,
    cards: []
  }

  const newListData = [...listData, newList]
  setListData(newListData)

  const mainListWrapper = document.querySelector('#main-list-wrapper')
  generateNewList( mainListWrapper, newList)

  e.target[0].value = ''
}

export const openFormToMakeNewList = () => {
  generateFormToMakeNewList()
}

export const handleClickBtnToAddCard = (e) => {
  generateFormToAddNewCard(e.target.parentElement)
  e.target.parentElement.removeChild(e.target)
}

export const handleNewCardSubmission = async (e) => {
  e.preventDefault()

  const content = e.target[0].value
  const listId = e.target.parentElement.parentElement.children[1].id
  const id = await requestToMakeNewCard( listId, content )  
  const parent = e.target.parentElement.previousElementSibling

  const newListData = listData.map( list => {
    if (list.id === parent.id) {
      return {
        ...list,
        cards: [...list.cards, { id, content }]
      }
    }

    return list
  })

  setListData(newListData)
  generateOneListItem( parent, content, id )

  e.target[0].value = ''
}

export const closeFormToAddNewList = (e, form) => {
  e.preventDefault()
  const initialList = document.querySelector('#initial-list')
  initialList.removeChild(form)
}

export const closeFormToAddNewCard = (parent, grandParent) => {
  grandParent.removeChild(parent)

  const div = document.createElement('div')
  div.classList.add('addCardBtnBox')

  const addCardButton = generateBtnToAddCard()
  addCardButton.addEventListener('click', handleClickBtnToAddCard)
  div.appendChild(addCardButton)
  grandParent.appendChild(div)
}

export const addDragStartAndDragEndListener = (draggable) => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')

    setDragData({
      ...dragData,
      draggingId: draggable.id,
      draggingContent: draggable.textContent,
      from: draggable.parentElement.id
    })
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')

    setDragData({
      draggingId: null,
      drraggingContent: null,
      hoveredEl: null,
      from: null,
      to: null
    })
  })
}

export const addDragOverListener = (list) => {
  list.addEventListener('dragover', (e) => {
    e.preventDefault()
    
    const hoveredElement = getHoveredElement(list, e.clientY)
    const item = document.querySelector('.dragging')

    setDragData({
      ...dragData,
      hoveredEl: hoveredElement ? hoveredElement.id : null
    })

    if (hoveredElement === null) {
      list.appendChild(item)
    } else {
      list.insertBefore(item, hoveredElement)
    }
  })
}

const getHoveredElement = (list, y) => {
  const otherElements = [...list.querySelectorAll('.draggable-items:not(.dragging)')]
  
  return otherElements.reduce( (closest, current) => {
    const box = current.getBoundingClientRect()
    const offset = y - box.top - (box.height / 2)
    
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: current}
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}

export const addDropListener = (designatedList) => {
  designatedList.addEventListener('drop', (e) => {
    // 다른 리스트간 이동일 경우
    if (dragData.from !== designatedList.id) {
      const listToSubtract = listData.filter(list => list.id === dragData.from)[0].cards
      const listToAdd = listData.filter(list => list.id === designatedList.id)[0].cards

      const subtractedList = makeListWithNewOrder(listToSubtract)
      const addedList = makeListWithNewOrder(listToAdd)

      setListData(
        listData.map( list => {
          if (list.id === dragData.from) {
            return {...list, cards: subtractedList}
          } else if (list.id === designatedList.id) {
            return {...list, cards: addedList}
          } else {
            return list
          }
        })
      )

      requestToUpdateOrder( subtractedList, dragData.from )
      requestToUpdateOrder( addedList, designatedList.id )

    // 같은 리스트 내 이동인 경우
    } else {
      const currentCards = listData.filter(list => list.id === designatedList.id)[0].cards
      const newCards = makeListWithNewOrder(currentCards)
      
      setListData(
        listData.map( list => {
          if (list.id === designatedList.id) {
            return {...list, cards: newCards}
          } else {
            return list
          }
        })
      )

      requestToUpdateOrder( newCards, designatedList.id )
    }
  })
}

const makeListWithNewOrder = ( originalList ) => {
  const card = {
    id: dragData.draggingId,
    content: dragData.draggingContent
  }
  
  let { list, hoveredIndex } = originalList.reduce((acc, cur, i, arr) => {
    if (cur.id === card.id) {
      let list = arr.slice()
      list.splice(i, 1)

      return { ...acc, list: list}

    } else if (cur.id === dragData.hoveredEl) {
      return { ...acc, hoveredIndex: i }

    } else { return acc }
  }, {})

  if (list === undefined) list = originalList.slice()

  return (
    [
      ...list.slice(0, hoveredIndex), 
      card, 
      ...list.slice(hoveredIndex)
    ]
  )
}