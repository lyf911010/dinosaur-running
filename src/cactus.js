import { Texture, Rectangle, Sprite } from 'pixi.js'

class Cactus {
  constructor(baseTexture) {
    this.baseTexture = baseTexture
    this.cactusSprite = null
  }

  initCactusSprite() {
    const cactusTexture = new Texture(
      this.baseTexture,
      new Rectangle(446, 2, 34, 70)
    )
    this.cactusSprite = new Sprite(cactusTexture)
    this.cactusSprite.x = window.innerWidth / 2
    this.cactusSprite.y = window.innerHeight - 80 - 70
  }

  get getCactusSprite() {
    return this.cactusSprite
  }
}
export default Cactus