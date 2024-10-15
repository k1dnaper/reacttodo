import React from 'react'

import ToDoListItems from './todo-items'
import './to-do.css'
const ToDoList = ({ items, onToggleDone, onDelete, onEditLabel }) => {
  const elements = items.map((item) => {
    const { id, ...itemProps } = item

    return (
      <li key={id} className={item.type} label={item.label}>
        <ToDoListItems
          {...itemProps}
          onToggleDone={() => onToggleDone(id)}
          onDelete={() => onDelete(id)}
          onEditLabel={(newLabel) => onEditLabel(item.id, newLabel)}
        />
      </li>
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

export default ToDoList
