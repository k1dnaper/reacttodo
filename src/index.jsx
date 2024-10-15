import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'

import SearchPanel from './components/search'
import AppHeader from './components/app-head'
import ToDoList from './components/to-do'
import Footer from './components/footer'
import './app.css'

export default class App extends Component {
  maxId = 10
  state = {
    items: [
      { label: 'drink', id: 1, type: false },
      { label: 'drunk', id: 2, type: false },
      { label: 'drank', id: 3, type: false },
    ],
    filter: 'all',
    search: '',
  }
  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id)
    const oldItem = arr[idx]
    const value = !oldItem[propName]
    const item = { ...arr[idx], [propName]: value }
    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)]
  }
  onToggleDone = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.items, id, 'type')
      return { items }
    })
  }
  onFilterChange = (filter) => {
    this.setState({ filter })
  }

  searchItems(items, search) {
    if (search.length === 0) {
      return items
    }
    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(search.toLowerCase()) > -1
    })
  }
  onItemAdded = (label) => {
    if (!label || label.trim() === '') {
      alert('Пробел нельзя')
      return
    }
    this.setState((state) => {
      const item = this.createItem(label)
      return { items: [...state.items, item] }
    })
  }
  createItem(label) {
    return {
      id: ++this.maxId,
      label,
      type: false,
    }
  }

  deleteCompleted = () => {
    this.setState((state) => {
      const items = state.items.filter((item) => !item.type)
      return { items }
    })
  }
  filterItems(items, filter) {
    if (filter === 'all') {
      return items
    } else if (filter === 'active') {
      return items.filter((item) => !item.type)
    } else if (filter === 'completed') {
      return items.filter((item) => item.type)
    }
  }
  onDelete = (id) => {
    this.setState((state) => {
      const idx = state.items.findIndex((item) => item.id === id)
      const items = [...state.items.slice(0, idx), ...state.items.slice(idx + 1)]
      return { items }
    })
  }
  onEditLabel = (id, newLabel) => {
    this.setState((state) => {
      const items = state.items.map((item) => {
        if (item.id === id) {
          return { ...item, label: newLabel }
        }
        return item
      })
      return { items }
    })
  }

  render() {
    const { items, filter, search } = this.state
    const doneCount = items.filter((items) => items.type).length
    const toDoCount = items.length - doneCount
    const visibleItems = this.searchItems(this.filterItems(items, filter), search)
    return (
      <div className="todoapp">
        <AppHeader />
        <SearchPanel onItemAdded={this.onItemAdded} />
        <ToDoList
          items={visibleItems}
          onToggleDone={this.onToggleDone}
          onDelete={this.onDelete}
          onEditLabel={this.onEditLabel}
        />
        <Footer
          toDo={toDoCount}
          done={doneCount}
          filter={filter}
          onFilterChange={this.onFilterChange}
          onDeleteCompleted={this.deleteCompleted}
        />
      </div>
    )
  }
}

const rootElement = document.getElementById('root')
const root = createRoot(rootElement)
root.render(<App />)
