import { 
  makeNewList,
  handleClickBtnToAddCard,
  handleNewCardSubmission,
  closeFormToAddNewList,
  closeFormToAddNewCard
} from '../functions/functions.js'

export const generateBtnToAddCard = () => {
  const btn = document.createElement('button')
  btn.textContent = 'Add a card...'
  btn.classList.add('addCardBtn')

  return btn
}

export const generateFormToMakeNewList = () => {
  const initialList = document.querySelector('#initial-list')
  const form = document.createElement('form')
  const input = document.createElement('input')
  const span = document.createElement('span')
  const submitBtn = document.createElement('button')
  const closeBtn = document.createElement('button')

  form.setAttribute('id', 'new-list-form')
  input.setAttribute('type', 'text')
  input.setAttribute('placeholder', 'Add a list...')
  submitBtn.setAttribute('type', 'submit')
  submitBtn.classList.add('green-btn')

  submitBtn.textContent = 'Save'
  closeBtn.textContent = 'X'

  form.addEventListener('submit', (e) => makeNewList(e))
  closeBtn.addEventListener('click', (e)=> closeFormToAddNewList(e, form))
  
  initialList.appendChild(form)
  form.appendChild(input)
  form.appendChild(span)
  span.appendChild(submitBtn)
  span.appendChild(closeBtn)
}

export const generateFormToAddNewCard = (parentElement) => {
  const form = document.createElement('form')
  const textarea = document.createElement('textarea')
  const span = document.createElement('span')
  const submitBtn = document.createElement('button')
  const closeBtn = document.createElement('button')

  form.setAttribute('id', 'new-card-form')
  span.classList.add('add-btn-box')
  submitBtn.setAttribute('type', 'submit')
  submitBtn.classList.add('green-btn')
  submitBtn.textContent = 'Add'
  closeBtn.setAttribute('type', 'button')
  closeBtn.textContent = 'X'

  form.addEventListener('submit', handleNewCardSubmission)
  closeBtn.addEventListener('click', (e) =>closeFormToAddNewCard(form, parentElement))

  form.appendChild(textarea)
  form.appendChild(span)
  span.appendChild(submitBtn)
  span.appendChild(closeBtn)

  parentElement.appendChild(form)
}

export const generateNewList = ( parent, listName ) => {
  const section = document.createElement('section')
  const ul = document.createElement('ul')
  const span = document.createElement('span')
  const i = document.createElement('i')
  const div = document.createElement('div')
  const addCardButton = generateBtnToAddCard(ul)

  ul.classList.add('item-list')
  span.classList.add('list-title')
  span.textContent = listName
  i.setAttribute('class', 'fas fa-ellipsis-h')
  div.classList.add('addCardBtnBox')

  addCardButton.addEventListener('click', handleClickBtnToAddCard)

  section.appendChild(span)
  section.appendChild(ul)
  section.appendChild(div)
  span.appendChild(i)
  div.appendChild(addCardButton)

  parent.appendChild(section)

  return ul
}

export const generateOneListItem = ( parent, content ) => {
  const li = document.createElement('li')
  li.classList.add('draggable-items')
  li.setAttribute('draggable', true)
  li.textContent = content

  parent.appendChild(li)
}
