import Phaser from 'phaser'

export default class extends Phaser.Group {
  constructor(
    game, x, y, key, label, labelKey, fontSize, callback, callbackContext) {
    super(game)
    this.x = x
    this.y = y
    this.button = new Phaser.Button(
      game, 0, 0, null, callback, callbackContext, 1, 0, 2)
    this.scale.setTo(2)
    this.label = game.add.bitmapText(0, 0, labelKey, label, fontSize)
    this.label.scale.setTo(0.5)

    this.normalSlice = game.add.nineSlice(
      0, 0, key, null, this.button.width, this.button.height)
    this.add(this.normalSlice)
    this.overSlice = game.add.nineSlice(
      0, 0, key + '_over', null, this.button.width, this.button.height)
    this.add(this.overSlice)
    this.downSlice = game.add.nineSlice(
      0, 0, key + '_down', null, this.button.width, this.button.height)
    this.add(this.downSlice)
    this.changeState(this.normalSlice)

    // Calculate sizes
    this.label.x = this.normalSlice.leftSize
    this.label.y = this.normalSlice.topSize / 2
    const width =
      this.label.width + this.normalSlice.leftSize + this.normalSlice.rightSize
    const height =
      this.label.fontSize * 0.4 + this.normalSlice.topSize / 2 + this.normalSlice.bottomSize * 0.75
    this.normalSlice.resize(width, height)
    this.overSlice.resize(width, height)
    this.downSlice.resize(width, height)
    this.button.width = width
    this.button.height = height
    // Add label last so it is on top
    this.add(this.label)
    this.add(this.button)

    this.button.onInputOver.add(() => {
      this.changeState(this.overSlice)
    })
    this.button.onInputOut.add(() => {
      this.changeState(this.normalSlice)
    })
    this.button.onInputDown.add(() => {
      this.changeState(this.downSlice)
    })
    this.button.onInputUp.add(() => {
      this.changeState(this.overSlice)
    })
  }

  changeState(showSprite) {
    this.forEach((child) => {
      child.alpha = 0
    })
    showSprite.alpha = 1
    this.label.alpha = 1
  }
}
