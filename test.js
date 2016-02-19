import test from 'ava'
import { createStore } from 'redux'
import { Reaction, exportActions, importActions } from './redux-reaction'

test('create store with one action', t => {
  const initialState = { test: false }

  let testAction = Reaction('test action', {
    reducer: (state, action) => ({ test: true })
  })

  let testActions = exportActions({ testAction }, initialState)

  let re = importActions({ testActions })
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

  let AB = exportActions({ A, B }, initialState)

  let re = importActions({ AB })
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

  let AA = exportActions({ A }, initialStateA)
  let BB = exportActions({ B }, initialStateB)

  let re = importActions({ AA, BB })
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
