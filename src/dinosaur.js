import { Texture, Rectangle, AnimatedSprite, Sprite } from 'pixi.js'
class Dinosaur {
  constructor(baseTexture) {
    this.baseTexture = baseTexture
    this.runAnimationSprite = null
    this.jumpSprite = null
  }
  initAnimationSprite() {
    const runTextures = []
    for (let i = 0; i < 2; i++) {
      runTextures.push(
        new Texture(
          this.baseTexture,
          new Rectangle(1678 + (2 + i) * 88, 6, 88, 90)
        )
      )
    }
    this.runAnimationSprite = new AnimatedSprite(runTextures)
    this.runAnimationSprite.animationSpeed = 0.1
    this.runAnimationSprite.visible = false
    this.runAnimationSprite.play()
  }

  initJumpSprite() {
    const jumpTexture = new Texture(
      this.baseTexture,
      new Rectangle(1678, 6, 88, 90)
    )
    this.jumpSprite = new Sprite(jumpTexture)
    this.jumpSprite.visible = false
    this.jumpSprite.x = 60
    this.jumpSprite.y = window.innerHeight - 80 - 90
  }

  get getAnimationSprite() {
    return this.runAnimationSprite
  }

  get getJumpSprite() {
    return this.jumpSprite
  }
}

export default Dinosaur