class NeuroBot {

}

class RandomBot {

  makeMove(currentBoard, ownSymbol) {
    const boardSize = currentBoard.length

    let i = 0, j = 0

    do {
      i = Math.floor(Math.random() * boardSize)
      j = Math.floor(Math.random() * boardSize)

    } while(currentBoard[i][j] !== null)

    return { row: i, column: j }
  }
}

class BotFactory {

  makeRandomBot() {
    return new RandomBot()
  }

  makeNeuroBot() {
    return new NeuroBot()
  }
}

export default new BotFactory()