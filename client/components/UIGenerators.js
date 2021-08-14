import { 
  makeNewList,
  handleClickBtnToAddCard,
  handleNewCardSubmission,
  closeFormToAddNewList,
  closeFormToAddNewCard
} from '../functions/functions.js'

/*
  <div>
    <button class="addCardBtn">Add a card...</button>
  </div>
*/

export const btnToAddCard = () => {
  const btn = document.createElement('button')
  btn.textContent = 'Add a card...'
  btn.classList.add('addCardBtn')

  return btn
}

export const generateFormToMakeNewList = () => {
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


/* 
  <form id="new-card-form">
    <textarea></textarea>
    <span class="add-btn-box">
      <button type="submit" class="green-btn">Add</button>
      <button>X</button>
    </span>
  </form>
*/

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

/* 
  <section>
    <ul class="item-list">
      <span class="list-title">리스트 이름 <i class="fas fa-ellipsis-h"></i></span>
      <li>카드1</li>
      <li>카드2</li>
      <li>카드3</li>
      <form id="new-card-form">
        <textarea></textarea>
        <span class="add-btn-box">
          <button type="submit" class="green-btn">Add</button>
          <button>X</button>
        </span>
      </form>
    </ul>
  </section>
*/

export const generateNewList = ( parent, listName ) => {
  const section = document.createElement('section')
  const ul = document.createElement('ul')
  const span = document.createElement('span')
  const i = document.createElement('i')
  const div = document.createElement('div')
  const addCardButton = btnToAddCard(ul)

  ul.classList.add('item-list')
  span.classList.add('list-title')
  span.textContent = listName
  i.setAttribute('class', 'fas fa-ellipsis-h')

  div.addEventListener('click', handleClickBtnToAddCard)

  section.appendChild(ul)
  ul.appendChild(span)
  ul.appendChild(span)
  ul.appendChild(div)
  span.appendChild(i)
  div.appendChild(addCardButton)

  parent.appendChild(section)

  return ul
}

/*
<ul class="item-list">
  <li>카드 내용</li>
</ul>
*/

export const generateOneListItem = ( parent, content ) => {
  const li = document.createElement('li')
  li.textContent = content
  if ([...parent.children].length === 2) {
    parent.insertBefore(li, parent.firstElementChild.nextSibling)
  } else {
    parent.insertBefore(li, parent.lastElementChild)
  }
}
