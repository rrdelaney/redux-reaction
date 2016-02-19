# redux-reaction

`npm install --save-dev redux-reaction`

Goes one step further than redux-actions by placing your actions and reducers
in the same place. Example:

```js
// actions/test.js
import { Reaction, exportActions } from 'redux-reaction'

const addTest('set test', {
  reducer (state, action) {
    return {
      test: true
    }
  },
  initialState: {
    test: false
  }
})
```
