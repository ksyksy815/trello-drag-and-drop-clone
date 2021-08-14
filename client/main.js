import { makeListsWithData, openFormToMakeNewList } from './functions/functions.js'
import { requestInitialData } from './functions/requests.js'

/*--- variables ---*/

const addListBtn = document.querySelector('#add-btn')
let initialData = []


/*--- Initialize ---*/

const initialize = () => {
  requestInitialData()
  .then(res => {
    initialData = JSON.parse(res.initialData)
    makeListsWithData(initialData)
  })
  addListBtn.addEventListener('click', openFormToMakeNewList)
}

initialize()
