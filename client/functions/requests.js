export const requestInitialData = async () => {
  const response = await fetch('http://localhost:4000/initialData', {
    method: "GET",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    }
  })

  return response.json()
}

export const requestToCreateNewList = async (listName) => {
  const list = {
    name: listName,
    cards: []
  }

  const response = await fetch('http://localhost:4000/list', {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(list)
  })

  const id = await response.json()
  return id.id
}

export const requestToMakeNewCard = async (listId, content) => {
  const card = {
    listId,
    content
  }

  const response = await fetch('http://localhost:4000/card', {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(card)
  })
  const id = await response.json()
  
  return id.id
}

export const requestToRelocateCard = async (item, listId) => {
  const cardId = item.id
  const targetInfo = {
    cardId,
    listId
  }

  const response = await fetch('http://localhost:4000/card', {
    method: "PUT",
    mode: "cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(targetInfo)
  })
}