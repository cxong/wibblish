import Phaser from 'phaser'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './graphics'

export default class extends Phaser.State {
  preload() {
  }

  create() {
    this.game.stage.backgroundColor = 0xcccccc

    this.sounds = {
      //catch: this.game.add.audio('catch'),
    }

    this.groups = {
      ui: this.game.add.group()
    }

    const frameMargin = 10
    const frameWidth = SCREEN_WIDTH - frameMargin * 2
    const frameHeight = SCREEN_HEIGHT / 2 - frameMargin * 2

    const frame = this.game.add.nineSlice(
      frameMargin, SCREEN_HEIGHT / 2 + frameMargin, 'frame', null,
      frameWidth / 2, frameHeight / 2)
    frame.scale.setTo(2, 2)
    this.groups.ui.add(frame)

    const margin = 20 + frameMargin

    this.text = this.game.add.bitmapText(
      margin, SCREEN_HEIGHT / 2 + margin, 'alagard'
    )
    this.text.maxWidth = SCREEN_WIDTH - margin * 2
    this.text.tint = 0xdeeed6
    this.groups.ui.add(this.text)
  }

  update() {
    this.text.text = document.getElementById('speech').value
  }

  render() {
  }
}
