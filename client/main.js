import { makeListsWithData, openFormToMakeNewList } from './functions/functions.js'
import { requestInitialData } from './functions/requests.js'
import { listData, setListData } from './globalStates.js'

const initialize = () => {
  const addListBtn = document.querySelector('#add-btn')
  addListBtn.addEventListener('click', openFormToMakeNewList)

  requestInitialData()
  .then(res => {
    setListData(res.initialData)
    makeListsWithData(listData)
  })
  .catch(err => {
    console.log(err)
    makeListsWithData(listData)
  })
}

initialize()
