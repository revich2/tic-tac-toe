import React, { Component } from 'react'

import cx from 'classnames'

import { ReactComponent as Cross } from './cross.svg'
import { ReactComponent as Zero } from './zero.svg'

import styles from './styles.module.scss'

class Square extends Component {

  onClick = () => {
    const {
      column,
      row,
      onChange
    } = this.props

    onChange(row, column)
  }

  getContent = () => {
    const {
      status
    } = this.props

    let Content

    switch(status) {
      case 1: {
        Content = Cross
        break
      }

      case 0: {
        Content = Zero
        break
      }

      default: Content = null
    }

    return Content
  }
  
  render() {
    const Content = this.getContent()

    const squareClasses = cx(styles.column, {
      [styles.selected]: !!Content,
    })

    return (
      <td className={squareClasses} onClick={this.onClick}>
        {Content && <Content className={styles.content} />}
      </td>
    )
  }
}

export default Square