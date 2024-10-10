import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './search.css'

export default class SearchPanel extends Component {
  state = {
    label: '',
  }
  static propTypes = {
    label: PropTypes.string,
  }
  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { label } = this.state
    this.setState({ label: '' })
    const cb = this.props.onItemAdded || (() => {})
    cb(label)
  }

  render() {
    return (
      <form className="new-todo" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="form-control"
          value={this.state.label}
          onChange={this.onLabelChange}
          placeholder="Добавить задачу"
        />
      </form>
    )
  }
}
