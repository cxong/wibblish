import Phaser from 'phaser'

export default class extends Phaser.Button {
  constructor(game, x, y, key, label, callback, callbackContext) {
    super(game, x, y, null, callback, callbackContext, 1, 0, 2)
    this.scale.setTo(2)
    this.width = 50
    this.height = 50
    // TODO: figure out dimensions
    this.normalSlice = game.add.nineSlice(
      0, 0, key, null, this.width, this.height)
    this.addChild(this.normalSlice)
    this.overSlice = game.add.nineSlice(
      0, 0, key + '_over', null, this.width, this.height)
    this.addChild(this.overSlice)
    this.downSlice = game.add.nineSlice(
      0, 0, key + '_down', null, this.width, this.height)
    this.addChild(this.downSlice)
    this.changeState(this.normalSlice)

    this.onInputOver.add(() => {
      this.changeState(this.overSlice)
    })
    this.onInputOut.add(() => {
      this.changeState(this.normalSlice)
    })
    this.onInputDown.add(() => {
      this.changeState(this.downSlice)
    })
    this.onInputUp.add(() => {
      this.changeState(this.overSlice)
    })
  }

  changeState(showSprite) {
    this.children.map((child) => {
      child.alpha = 0
    })
    showSprite.alpha = 1
  }
}
