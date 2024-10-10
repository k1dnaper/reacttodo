import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import './todo-items.css'

const TodoListItem = ({ type, label, onToggleDone, onDelete }) => {
  let classNames = 'view'
  let dateToday = formatDistanceToNow(new Date())
  if (type) {
    classNames += ' done completed'
  }
  TodoListItem.defaultProps = {
    type: true,
    id: 200,
    label: 'Задача',
  }

  return (
    <div className={classNames}>
      <input className="toggle" type="checkbox" onClick={onToggleDone} />
      <label>
        <span className="description">{label} </span>
        <span className="created">{dateToday}</span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy" onClick={onDelete}></button>
    </div>
  )
}
export default TodoListItem
