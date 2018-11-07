import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Board from '../components/Board'

import { actions } from '../store/game'

import { PlayerEnums, mapPlayerBySymbol } from '../constants/types'

import { checkWinner } from '../utils/algorithmic'

import './App.scss'

const { game: gameActions } = actions

class App extends Component {

  componentDidMount() {
    const { setCurrentMove, initBoard } = this.props

    setCurrentMove(PlayerEnums.CROSSES)
    initBoard()
  }

  shouldComponentUpdate(nextProps) {
    const { currentBoard, setWinner } = nextProps

    const winner = checkWinner(currentBoard)
    
    if (winner !== null) {
      setWinner(mapPlayerBySymbol[winner])

      // setCurrentMove(mapPlayerBySymbol[winner])
      // initBoard()
    }

    console.log('winner', checkWinner(currentBoard))

    return true
  }

  onCeilClick = (row, column) => {
    const { setCurrentMove, setSymbolInSquare, currentMove } = this.props
    const { CROSSES, ZEROS } = PlayerEnums

    setSymbolInSquare({ row, column })

    const nextMover = CROSSES === currentMove ? ZEROS : CROSSES
    setCurrentMove(nextMover)
  }

  render() {
    const { currentBoard, winner } = this.props

    const isEmptyBoard = !!currentBoard
    const isGameOver = winner !== null

    return (
      <div className="app">
        { isEmptyBoard && <Board data={currentBoard} onChange={this.onCeilClick} disable={isGameOver} /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentMove: state.game.currentMove,
  currentBoard: state.game.currentBoard,
  winner: state.game.winner,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setCurrentMove: gameActions.setCurrentMove,
  setSymbolInSquare: gameActions.setSymbolInSquare,
  setWinner: gameActions.setWinner,
  initBoard: gameActions.init,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
