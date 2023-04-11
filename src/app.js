import { Application } from 'pixi.js'

const app = new Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xffffff,
  resolution: window.devicePixelRatio || 1,
  antialias: true
})
document.body.appendChild(app.view)

export default app