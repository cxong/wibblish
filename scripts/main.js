import Phaser from 'phaser'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './graphics'

export default class extends Phaser.State {
  preload() {
  }

  create() {
    this.game.stage.backgroundColor = 0xcccccc

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.sounds = {
      //catch: this.game.add.audio('catch'),
    }

    this.groups = {
      //ground: this.game.add.group(),
      ui: this.game.add.group()
    }

    const textOptions = {
      font: '36px VT323',
      fill: '#212121',
      padding: 8,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 6,
      placeHolder: 'Hello world'
    }
    const margin = 10
    const allPadding = (textOptions.padding + textOptions.borderWidth + margin) * 2
    textOptions.width = SCREEN_WIDTH - allPadding
    textOptions.height = SCREEN_HEIGHT / 2 - allPadding
    this.text = this.game.add.inputField(
      margin, SCREEN_HEIGHT / 2 + margin, textOptions
    )
    this.groups.ui.add(this.text)
  }

  update() {
  }

  render() {
  }
}
