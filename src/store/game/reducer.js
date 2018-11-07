import { handleActions } from 'redux-actions'

import produce from 'immer'

import { mapSymbolByPlayer } from '../../constants/types'

import {
  game,
} from './actions'

const {
  setCurrentMove, setSymbolInSquare, setWinner, init,
} = game

const initialState = {
  currentMove: null,
  currentBoard: null,
  moveHistory: [],
  winner: null,
}

export default handleActions({
  [setCurrentMove]: (state, action) => produce(state, next => {
    next.currentMove = action.payload
  }),
  [setSymbolInSquare]: (state, action) => produce(state, next => {
    const { row, column } = action.payload

    next.currentBoard[row][column] = mapSymbolByPlayer[state.currentMove]
    next.moveHistory.push(next.currentBoard)
  }),
  [setWinner]: (state, action) => produce(state, next => {
    next.winner = action.payload
  }),
  [init]: state => produce(state, next => {
    const emptyBoard = Array(3).fill(null).map(()=>Array(3).fill(null))

    next.currentBoard = emptyBoard
    next.moveHistory.push(emptyBoard)
    next.winner = null
  }),
}, initialState)
