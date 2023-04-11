import * as PIXI from 'pixi.js'
import app from './src/app'

const container = new PIXI.Container()
app.stage.addChild(container)

// 加载基础图片
const baseTexture = PIXI.BaseTexture.from('./assets/img-bg.png')

// 恐龙贴图
const dinoTexture = new PIXI.Texture(
  baseTexture,
  new PIXI.Rectangle(76, 6, 88, 90)
)
const dino = new PIXI.Sprite(dinoTexture)
dino.visible = false

container.addChild(dino)

// 动态恐龙
const runTextures = []
for (let i = 0; i < 2; i++) {
  runTextures.push(
    new PIXI.Texture(
      baseTexture,
      new PIXI.Rectangle(1678 + (2 + i) * 88, 6, 88, 90)
    )
  )
}
const runAnimation = new PIXI.AnimatedSprite(runTextures)
runAnimation.animationSpeed = 0.1
runAnimation.visible = false
runAnimation.play()
container.addChild(runAnimation)

// 跳跃
const jumpTexture = new PIXI.Texture(
  baseTexture,
  new PIXI.Rectangle(1678, 6, 88, 90)
)
const jumpSprite = new PIXI.Sprite(jumpTexture)
jumpSprite.visible = false
jumpSprite.x = 60
jumpSprite.y = window.innerHeight - 80 - 90
container.addChild(jumpSprite)

// 地面
const groundTexture = new PIXI.Texture(
  baseTexture,
  new PIXI.Rectangle(2, 104, 2400, 24)
)
const groundSprite = new PIXI.TilingSprite(groundTexture)
groundSprite.width = window.innerWidth
groundSprite.height = 24
groundSprite.position.set(0, window.innerHeight - 80)
container.addChild(groundSprite)

// 仙人掌
const cactusTexture = new PIXI.Texture(
  baseTexture,
  new PIXI.Rectangle(446, 2, 34, 70)
)
const cactusSprite = new PIXI.Sprite(cactusTexture)
cactusSprite.x = window.innerWidth / 2
cactusSprite.y = window.innerHeight - 80 - 70
container.addChild(cactusSprite)

// 开始按钮
let startText = new PIXI.Text('开始游戏', {
  fontFamily: 'Arial',
  fontSize: 36,
  fill: 0x333333,
  align: 'center'
})
startText.x = window.innerWidth / 2
startText.y = window.innerHeight / 2
startText.anchor.set(0.5, 0.5)
container.addChild(startText)

startText.eventMode = 'static'
startText.on('click', () => {
  playGame()
})

let isGameing = false
let isGameOver = false
const playGame = () => {
  isGameing = true
  runAnimation.visible = true
  runAnimation.x = 60 
  runAnimation.y = window.innerHeight - 80 - 90
}

const gameOver = () => {
  isGameing = false
  isGameOver = true
  runAnimation.visible = false
  alert(`得分${score}`)
}

let score = 0

let jumpV = 20
let speed = 1
// 游戏循环
app.ticker.add(() => {
  if (isGameOver) return
  if (isGameing) {
    groundSprite.tilePosition.x -= 10
    cactusSprite.x -= 10
    if (cactusSprite.x < -30) {
      cactusSprite.x = window.innerWidth
      score++
    }
  }
  if (jumpSprite.visible) {
    jumpV -= speed
    jumpSprite.y -= jumpV
    if (jumpSprite.y > window.innerHeight - 80 - 90) {
      jumpSprite.y = window.innerHeight - 80 - 90
      jumpV = 20
      jumpSprite.visible = false
      runAnimation.visible = true
    }
  }
  // 碰撞
  if (
    jumpSprite.y > cactusSprite.y - 70 &&
    cactusSprite.x < jumpSprite.x + 88 &&
    cactusSprite.x > jumpSprite.x - 88
  ) {
    console.log('碰撞');
    gameOver()
  }
})

// 监听跳跃
window.addEventListener('keydown', e => {
  if (e.code === 'Space') {
    runAnimation.visible = false
    jumpSprite.visible = true
    jumpV = 20
  }
})