import { Text } from 'pixi.js'

class Info {
  constructor() {
    this.startText = null
  }

  initStartText() {
    this.startText = new Text('开始游戏', {
      fontFamily: 'Arial',
      fontSize: 36,
      fill: 0x333333,
      align: 'center'
    })
    this.startText.x = window.innerWidth / 2
    this.startText.y = window.innerHeight / 2
    this.startText.anchor.set(0.5, 0.5)
  }

  get getStartText() {
    return this.startText
  }
}
export default Info