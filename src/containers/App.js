import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Board from '../components/Board'

import { actions } from '../store/game'

import { PlayerEnums } from '../constants/types'

import { randomBot } from '../services/index'

import './App.scss'

const { game: gameActions } = actions

class App extends Component {

  componentDidMount() {
    const { setCurrentMove, initBoard } = this.props

    setCurrentMove(PlayerEnums.CROSSES)
    initBoard()
  }

  botMove = () => {
    const { currentBoard } = this.props

    const { row, column } = randomBot.makeMove(currentBoard)

    this.props.makeMove(row, column)
  }

  onCeilClick = (row, column) => {
    this.props.makeMove(row, column, ({ winner }) => {
      
      if (winner === null) {
        setTimeout(this.botMove, 100)
      }
    })
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
  makeMove: actions.makeMove,
  setCurrentMove: gameActions.setCurrentMove,
  setSymbolInSquare: actions.setSymbolInSquare,
  setWinner: gameActions.setWinner,
  initBoard: gameActions.init,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
