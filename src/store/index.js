import {
  createStore as reduxCreateStore, compose, applyMiddleware, combineReducers,
} from 'redux'
import thunk from 'redux-thunk'

import game from './game'

const createStore = (initialState) => {
  const reduxDevTool = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ // eslint-disable-line
  const composeWithDevTools = !reduxDevTool ? compose : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) // eslint-disable-line

  const middleware = composeWithDevTools(applyMiddleware(thunk))

  const reducer = combineReducers({
    game
  })

  return reduxCreateStore(reducer, initialState, middleware)
}

export default createStore
