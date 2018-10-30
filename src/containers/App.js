import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Board from '../components/Board'

import { actions } from '../store/game'

import { PlayerEnums } from '../constants/types'

import { checkWinner } from '../utils/algorithmic'

import './App.scss'

const { game: gameActions } = actions

class App extends Component {

  componentDidMount() {
    const { setCurrentMove, initBoard } = this.props

    setCurrentMove(PlayerEnums.CROSSES)
    initBoard()
  }

  componentDidUpdate() {
    const { currentBoard } = this.props

    checkWinner(currentBoard)
    console.log('winner', checkWinner(currentBoard))
  }

  onCeilClick = (row, column) => {
    const { setCurrentMove, setSymbolInSquare, currentMove } = this.props
    const { CROSSES, ZEROS } = PlayerEnums

    setSymbolInSquare({ row, column })

    const nextMover = CROSSES === currentMove ? ZEROS : CROSSES
    setCurrentMove(nextMover)
  }

  render() {
    const { currentBoard } = this.props

    const isEmptyBoard = !!currentBoard

    return (
      <div className="app">
        { isEmptyBoard && <Board data={currentBoard} onChange={this.onCeilClick} /> }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentMove: state.game.currentMove,
  currentBoard: state.game.currentBoard,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  setCurrentMove: gameActions.setCurrentMove,
  setSymbolInSquare: gameActions.setSymbolInSquare,
  initBoard: gameActions.init,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
