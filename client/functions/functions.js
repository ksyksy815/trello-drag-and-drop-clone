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
  requestToRelocateCard
} from './requests.js'

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
  const list = {
    id,
    name: e.target[0].value,
    cards: []
  }

  const mainListWrapper = document.querySelector('#main-list-wrapper')
  generateNewList( mainListWrapper, list)
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
  let content = e.target[0].value
  const listId = e.target.parentElement.parentElement.children[1].id
  
  const id = await requestToMakeNewCard( listId, content )
  
  const parent = e.target.parentElement.previousElementSibling
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
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
}

export const addDragOverListener = (list) => {
  list.addEventListener('dragover', (e) => {
    e.preventDefault()
    
    const hoveredElement = getHoveredElement(list, e.clientY)
    const item = document.querySelector('.dragging')

    if (hoveredElement === null) {
      list.appendChild(item)
    } else {
      requestToRelocateCard(item, list.id)
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