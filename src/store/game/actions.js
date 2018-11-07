import { createActions } from 'redux-actions'
import { checkWinner } from '../../utils/algorithmic'
import { mapPlayerBySymbol, PlayerEnums } from '../../constants/types'

export const {
  game,
} = createActions({
  GAME: {
    SET_CURRENT_MOVE: undefined,
    SET_SYMBOL_IN_SQUARE: undefined,
    SET_WINNER: undefined,
    INIT: undefined,
  },
})

const setSymbolInSquare = (row, column) => (dispatch, getState) => {
  dispatch(game.setSymbolInSquare(row, column))
  
  const { game: { currentBoard } } = getState()

  const winner = checkWinner(currentBoard)

  if(winner !== null) {
    const winnerToState = winner === undefined ? winner : mapPlayerBySymbol[winner]

    dispatch(game.setWinner(winnerToState))
  }
}

const makeMove = (row, column, cb) => (dispatch, getState) => {
  dispatch(setSymbolInSquare({ row, column }))

  const { CROSSES, ZEROS } = PlayerEnums
  const { game: { currentMove } } = getState()

  const nextMover = CROSSES === currentMove ? ZEROS : CROSSES

  dispatch(game.setCurrentMove(nextMover))

  if (cb) {
    const { game: _game } = getState()
    cb(_game)
  }
}

export {
  setSymbolInSquare,
  makeMove,
}