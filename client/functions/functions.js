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
  generateOneListItem( e.target.parentElement, content )
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
  div.appendChild(generateBtnToAddCard())
  grandParent.appendChild(div)
}
