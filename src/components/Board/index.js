import React, { Component } from 'react'

import Square from '../../components/Square'

import styles from './styles.module.scss'

class Board extends Component {
  onChange = (row, column) => {
    const { onChange } = this.props

    onChange(row, column)
  }

  renderSquaresRow = (row, rowIndex) =>
    row.map((item, index) => <Square
      key={`${index}+${rowIndex}`}
      status={item}
      column={index}
      row={rowIndex}
      onChange={this.onChange}
    />)

  renderBoard = (squares) =>
    squares.map((row, index) => <tr key={index}>
        {this.renderSquaresRow(row, index)}
      </tr>)

  render() {
    const { data } = this.props

    return (
      <table className={styles.table}>
        <tbody>
          {this.renderBoard(data)}
        </tbody>
      </table>
    )
  }
}

export default Board