# redux-reaction

`npm install --save-dev redux-reaction`

Goes one step further than redux-actions by placing your actions and reducers
in the same place. Example:

```js
// actions.js
import { Reaction, groupActions, packageActions } from 'redux-reaction'

const initialState = { test: true }

const setTest = Reaction('set test', {
  reducer (state, action) {
    return {
      test: true
    }
  }
})

const unsetTest = Reaction('unset test', {
  reducer (state, action) {
    return {
      test: false
    }
  }
})

const test = groupActions({ setTest, unsetTest }, initialState)
export default packageActions({ test })
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
    const { actions, test } = this.props

    assert(test === true)
    actions.unsetTest()
    assert(test === false)
  }

  render () {
    return <h1>Hello redux-reaction</h1>
  }
}
