
export const addCardBtn = () => {
  const btn = document.createElement('button')
  btn.textContent = 'Add a card...'
  btn.classList.add('addCardBtn')

  return btn
}

{/* 
<form id="new-card-form">
  <textarea></textarea>
  <span class="add-btn-box">
    <button type="submit" class="green-btn">Add</button>
    <button>X</button>
  </span>
</form> */}

export const addNewCardForm = (parentElement) => {
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
  closeBtn.textContent = 'X'

  form.appendChild(textarea)
  form.appendChild(span)
  span.appendChild(submitBtn)
  span.appendChild(closeBtn)

  parentElement.appendChild(form)
}
