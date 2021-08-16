import { makeListsWithData, openFormToMakeNewList } from './functions/functions.js'
import { requestInitialData } from './functions/requests.js'
import { listData, setListData } from './globalStates.js'



/*--- Variables ---*/

const addListBtn = document.querySelector('#add-btn')



/*--- Initialize ---*/

const initialize = () => {
  requestInitialData()
  .then(res => {
    setListData(res.initialData)
    makeListsWithData(listData)
  })
  .catch(err => {
    console.log(err)
    makeListsWithData(listData)
  })
  addListBtn.addEventListener('click', openFormToMakeNewList)
}

initialize()
