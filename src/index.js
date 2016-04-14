import { combineReducers, bindActionCreators } from 'redux'
import { createAction, handleActions } from 'redux-actions'

export function Reaction (name, { action = undefined, reducer }) {
  return {
    name,
    reducer,
    action: createAction(name, action)
  }
}

export function groupActions (creators, initialState) {
  let reducers = {}
  let actions = {}

  Object.keys(creators).forEach(c => {
    reducers[creators[c].name] = creators[c].reducer
    actions[c] = creators[c].action
  })

  return {
    actions,
    reducer: handleActions(reducers, initialState)
  }
}

export function packageActions (creators) {
  const _actions = Object.keys(creators)
    .map(c => creators[c].actions)
    .reduce((prev, next) => ({ ...prev, ...next }), {})

  const _reducers = Object.keys(creators)
    .reduce((prev, c) => ({ ...prev, [c]: creators[c].reducer }), {})

  const action = dispatch => ({
    actions: bindActionCreators({
      ..._actions
    }, dispatch)
  })

  const ducer = combineReducers(_reducers)

  return { action, ducer, creators: _actions }
}
