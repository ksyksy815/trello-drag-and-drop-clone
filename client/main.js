/*--- variables ---*/

const addListBtn = document.querySelector('#add-btn')
const initialList = document.querySelector('#initial-list')
const main = document.querySelector('#list-board')

// states
let newListFormOn = false



/*--- functions ---*/
// const init = () => {
  
// }

const closeNewCardForm = (e, ul, form) => {
  e.preventDefault()
  ul.removeChild(form)
}

const openNewCardForm = (ul, openBtn) => {
  const form = document.querySelector('form')
  const textarea = document.createElement('textarea')
  const span = document.createElement('span')
  const submitBtn = document.createElement('button')
  const closeBtn = document.createElement('button')

  form.setAttribute('id', 'new-card-form')
  span.classList.add('add-btn-box')
  submitBtn.setAttribute('type', 'submit')
  submitBtn.classList.add('green-btn')
  submitBtn.textContent = 'Add'
  closeBtn.textContent = 'X'

  closeBtn.addEventListener('click', (e)=> closeNewCardForm(e, ul, form))

  span.appendChild(submitBtn)
  span.appendChild(closeBtn)
  form.appendChild(textarea)
  form.appendChild(span)
  ul.appendChild(form)
}

const makeNewList = (e) => {
  e.preventDefault()
  
  const listName = e.target[0].value

  const column = document.createElement('section')
  const ul = document.createElement('ul')
  const span = document.createElement('span')
  const i = document.createElement('i')
  const addCardBtn = document.createElement('button')

  ul.classList.add('item-list')
  span.classList.add('list-title')
  span.textContent = listName
  i.setAttribute('class', 'fas fa-ellipsis-h')
  addCardBtn.textContent = 'Add a card...'
  
  addCardBtn.addEventListener('click', ()=> openNewCardForm(ul, addCardBtn))

  column.appendChild(ul)
  ul.appendChild(span)
  ul.appendChild(addCardBtn)
  span.appendChild(i)
  main.appendChild(column)

  e.target[0].value = ''
}

const closeNewListForm = (e, form) => {
  e.preventDefault()
  initialList.removeChild(form)
}

const generateNewListForm = () => {
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
  closeBtn.addEventListener('click', (e)=> closeNewListForm(e, form))
  
  initialList.appendChild(form)
  form.appendChild(input)
  form.appendChild(span)
  span.appendChild(submitBtn)
  span.appendChild(closeBtn)
}



/*--- Init & Event listeners ---*/

//init()
addListBtn.addEventListener('click', generateNewListForm)