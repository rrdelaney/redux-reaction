import test from 'ava'
import { createStore } from 'redux'
import { Reaction, groupActions, packageActions } from './redux-reaction'

test('create store with one action', t => {
  const initialState = { test: false }

  let testAction = Reaction('test action', {
    reducer: (state, action) => ({ test: true })
  })

  let testActions = groupActions({ testAction }, initialState)

  let re = packageActions({ testActions })
  let store = createStore(re.ducer)
  let { actions } = re.action(store.dispatch)

  t.false(store.getState().testActions.test)
  actions.testAction()
  t.true(store.getState().testActions.test)
})

test('create store with two actions', t => {
  const initialState = { test: false }

  let A = Reaction('A', {
    reducer: (state, action) => ({ test: true })
  })

  let B = Reaction('B', {
    reducer: (state, action) => ({ test: false })
  })

  let AB = groupActions({ A, B }, initialState)

  let re = packageActions({ AB })
  let store = createStore(re.ducer)
  let { actions } = re.action(store.dispatch)

  t.false(store.getState().AB.test)

  actions.A()
  t.true(store.getState().AB.test)

  actions.B()
  t.false(store.getState().AB.test)
})

test('create store with two exported actions', t => {
  const initialStateA = { test: false }
  const initialStateB = { test: true }

  let A = Reaction('A', {
    reducer: (state, action) => ({ test: true })
  })

  let B = Reaction('B', {
    reducer: (state, action) => ({ test: false })
  })

  let AA = groupActions({ A }, initialStateA)
  let BB = groupActions({ B }, initialStateB)

  let re = packageActions({ AA, BB })
  let store = createStore(re.ducer)
  let { actions } = re.action(store.dispatch)

  t.false(store.getState().AA.test)
  t.true(store.getState().BB.test)

  actions.A()
  t.true(store.getState().AA.test)
  t.true(store.getState().BB.test)

  actions.B()
  t.true(store.getState().AA.test)
  t.false(store.getState().BB.test)
})
