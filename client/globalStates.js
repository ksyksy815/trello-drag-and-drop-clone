export let listData = [
  {
    id: "000",
    name: "Initial title",
    cards: [
      {
        id: "0001",
        content: "서버를 켜주세요! 😃"
      }
    ]
  }
]

export const setListData = (data) => {
  listData = data
}

export let dragData = {
  dragging: null,
  hoveredEl: null,
  from: null
}

export const setDragData = (el) => {
  dragData = el
}