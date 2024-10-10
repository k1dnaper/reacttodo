import React from 'react'

import ToDoListItems from './todo-items'
import './to-do.css'
const ToDoList = ({ items, onToggleDone, onDelete }) => {
  const elements = items.map((item) => {
    const { id, ...itemProps } = item

    return (
      <li key={id} className={item.type}>
        <ToDoListItems {...itemProps} onToggleDone={() => onToggleDone(id)} onDelete={() => onDelete(id)} />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default ToDoList
