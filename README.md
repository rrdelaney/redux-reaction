# redux-reaction

`npm install --save-dev redux-reaction`

Goes one step further than redux-actions by placing your actions and reducers
in the same place. Example:

```js
// actions.js
import { Reaction, groupActions, packageActions } from 'redux-reaction'

const initialState = { todos: [] }

const addTodo = Reaction('add todo', {
  action (item) {
    return item
  },
  reducer (state, { payload }) {
    return {
      todos: [
        ...state.todos,
        payload
      ]
    }
  }
})

const clearTodos = Reaction('clear todos', {
  reducer: () => initialState
})

const todo = groupActions({ addTodo, clearTodos }, initialState)
export default packageActions({ todo })
```

```js
// store.js
import { createStore } from 'redux'
import re from './actions'

export default createStore(re.ducer)
```

```js
// App.jsx
import React, { Component } from 'react'
import { connect } from 'react-redux'
import store from './store'
import re from './actions'

const selector = state => state

@connect(selector, re.action)
export default class App extends Component {
  constructor () {
    this.state = {
      text: ''
    }
  }
  
  handleText (target) {
    this.setState({
      text: target.value
    })
  }

  render () {
    const { actions, todo } = this.props
    
    return <div>
      <ul>
        {todo.todos.map(t => <li key={t}>{t}</li>)}
      </ul>
      
      <button onClick={actions.clearTodos}>Clear</button>
      <button onClick={this.addTodo}>AddTodo</button>
    </div>
  }
}
```
