import { Texture, Rectangle, TilingSprite } from 'pixi.js'

class Ground {
  constructor(baseTexture) {
    this.baseTexture = baseTexture
    this.groundSprite = null
  }

  initGroundSprite() {
    const groundTexture = new Texture(
      this.baseTexture,
      new Rectangle(2, 104, 2400, 24)
    )
    this.groundSprite = new TilingSprite(groundTexture)
    this.groundSprite.width = window.innerWidth
    this.groundSprite.height = 24
    this.groundSprite.position.set(0, window.innerHeight - 80)
  }

  get getGroundSprite() {
    return this.groundSprite
  }
}
export default Ground