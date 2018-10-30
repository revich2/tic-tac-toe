const getWinnerConditions = (board) => {
  let conditions = board // all rows

  let columns = [] // all columns
  for(let i = 0; i < board.length; i++) {
    let column = []

    for(let j = 0; j < board.length; j++) {
      column.push(board[j][i])
    }

    columns.push(column)
    column = []
  }

  let diag = [] // diagonales
  let antiDiag = []
  for(let i = 0; i < board.length; i++) {
    diag.push(board[i][i])
    antiDiag.push(board[i][board.length - 1 - i])
  }

  conditions = [...conditions, ...columns, diag, antiDiag]

  return conditions
}

export const checkWinner = (board) => {
  const arrayOfConditions = getWinnerConditions(board)

  let winner = null
  for(let i = 0; i < arrayOfConditions.length; i++) {
    const condition = arrayOfConditions[i]
    const isLoserCondition = condition.some(o => o !== condition[0])

    if(!isLoserCondition) {
      winner = condition[0]
      break
    }
  }

  return winner
}