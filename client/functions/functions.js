import { 
  generateBtnToAddCard, 
  generateNewList,
  generateFormToAddNewCard, 
  generateOneListItem,
  generateFormToMakeNewList
} from '../components/UIGenerators.js'

export const makeNewList = (e) => {
  e.preventDefault()
  const mainListWrapper = document.querySelector('#main-list-wrapper')
  generateNewList( mainListWrapper, e.target[0].value)
  e.target[0].value = ''
}

export const openFormToMakeNewList = () => {
  generateFormToMakeNewList()
}

export const handleClickBtnToAddCard = (e) => {
  generateFormToAddNewCard(e.target.parentElement)
  e.target.parentElement.removeChild(e.target)
}

export const handleNewCardSubmission = (e) => {
  e.preventDefault()
  let content = e.target[0].value
  console.dir(e.target.parentElement.previousElementSibling)
  generateOneListItem( e.target.parentElement.previousElementSibling, content )
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