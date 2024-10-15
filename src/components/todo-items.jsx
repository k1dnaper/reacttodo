import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import './todo-items.css'

const TodoListItem = ({ type, label, onToggleDone, onDelete, onEditLabel }) => {
  const [currentLabel, setCurrentLabel] = React.useState(label)
  const [editMode, setEditMode] = React.useState(false)

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

  const handleChange = (event) => {
    setCurrentLabel(event.target.value)
  }

  const toggleEditMode = () => {
    setEditMode(!editMode)
  }
  return (
    <>
      {!editMode ? (
        <div className={classNames}>
          <input className="toggle" type="checkbox" onClick={onToggleDone} />
          <label>
            <span className="description">{currentLabel} </span>
            <span className="created">{dateToday}</span>
          </label>
          <button className="icon icon-edit" onClick={toggleEditMode}></button>
          <button className="icon icon-destroy" onClick={onDelete}></button>
        </div>
      ) : (
        <div className="edit">
          <input
            value={currentLabel}
            onChange={handleChange}
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                onEditLabel(currentLabel)
                setEditMode(!editMode)
              }
            }}
          />
        </div>
      )}
    </>
  )
}

export default TodoListItem
