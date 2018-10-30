import { createActions } from 'redux-actions'

export const {
  game,
} = createActions({
  GAME: {
    SET_CURRENT_MOVE: undefined,
    SET_SYMBOL_IN_SQUARE: undefined,
    INIT: undefined,
  },
})
