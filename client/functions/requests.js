export const requestInitialData = async () => {
  try {
    const response = await fetch('http://localhost:4000/initialData', {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      }
    })
  
    return response.json()
  }
  catch (err) {
    console.log(err)
  }
}

export const requestToCreateNewList = async (listName) => {
  const list = {
    name: listName,
    cards: []
  }

  try {
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
  catch (err) {
    console.log(err)
  }
}

export const requestToMakeNewCard = async (listId, content) => {
  const card = {
    listId,
    content
  }

  try {
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
  catch (err) {
    console.log(err)
  }
}

export const requestToUpdateOrder = async (updatedList, listId) => {
  try {
    await fetch(`http://localhost:4000/list/${listId}`, {
      method: "PATCH",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedList)
    })
  }
  catch (err) {
    console.log(err)
  }
}