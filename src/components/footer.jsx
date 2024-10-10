import React from 'react'
import './footer.css'

const filterButtons = [
  { name: 'all', label: 'All' },
  { name: 'active', label: 'Active' },
  { name: 'completed', label: 'Completed' },
]

const ItemStatusFilter = ({ filter, onFilterChange = () => {} }) => {
  const buttons = filterButtons.map(({ name, label }) => {
    const isActive = name === filter
    const classNames = 'button' + isActive

    return (
      <li key={name} onClick={() => onFilterChange(name)} className={classNames}>
        <button> {label}</button>
      </li>
    )
  })
  return <ul className="filters">{buttons}</ul>
}
const Footer = ({ toDo, done, filter, onDeleteCompleted, onFilterChange = () => {} }) => {
  return (
    <footer className="footer">
      <span className="todo-count">
        {toDo} more to do, {done} done
      </span>

      <ItemStatusFilter filter={filter} onFilterChange={onFilterChange} />

      <button className="clear-completed" onClick={onDeleteCompleted}>
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
