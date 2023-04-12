import { BaseTexture, Container } from 'pixi.js'
import app from './src/app'
import Dinosaur from './src/dinosaur'
import Ground from './src/ground'
import Cactus from './src/cactus'
import Info from './src/info'

let score = 0
let jumpV = 20
let speed = 1
let isGameing = false
let isGameOver = false
let startText
let runAnimation
let groundSprite
let cactusSprite
let jumpSprite

const initApp = () => {
  const baseTexture = BaseTexture.from('./assets/img-bg.png')
  const container = new Container()
  const dinosaur = new Dinosaur(baseTexture)
  const ground = new Ground(baseTexture)
  const cactus = new Cactus(baseTexture)
  const info = new Info(baseTexture)

  app.stage.addChild(container)
  
  dinosaur.initAnimationSprite()
  dinosaur.initJumpSprite()
  ground.initGroundSprite()
  cactus.initCactusSprite()
  info.initStartText()

  container.addChild(dinosaur.getAnimationSprite)
  container.addChild(dinosaur.getJumpSprite)
  container.addChild(ground.getGroundSprite)
  container.addChild(cactus.getCactusSprite)
  container.addChild(info.getStartText)

  startText = info.getStartText
  runAnimation = dinosaur.getAnimationSprite
  groundSprite = ground.getGroundSprite
  cactusSprite = cactus.getCactusSprite
  jumpSprite = dinosaur.getJumpSprite
}

const afterInit = () => {
  startText.eventMode = 'static'
  startText.on('click', () => {
    playGame()
    startText.visible = false
  })

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
  
  window.addEventListener('keydown', e => {
    if (e.code === 'Space' && !jumpSprite.visible) {
      runAnimation.visible = false
      jumpSprite.visible = true
      jumpV = 20
    }
  })
}

const playGame = () => {
  isGameing = true
  isGameOver = false
  runAnimation.visible = true
  runAnimation.x = 60 
  runAnimation.y = window.innerHeight - 80 - 90
}

const gameOver = () => {
  isGameing = false
  isGameOver = true
  runAnimation.visible = false
  startText.visible = true
  cactusSprite.x = window.innerWidth / 2
  cactusSprite.y = window.innerHeight - 80 - 70
  alert(`得分${score}`)
}

initApp()

afterInit()