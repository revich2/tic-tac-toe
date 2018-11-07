import BotFactory from './BotFactory'

const randomBot = BotFactory.makeRandomBot()
const neuroBot = BotFactory.makeNeuroBot()

export {
  randomBot,
  neuroBot,
}