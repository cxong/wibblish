import Phaser from 'phaser'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './graphics'
import Button from './button'

export default class extends Phaser.State {
  preload() {
  }

  create() {
    this.game.stage.backgroundColor = 0xcccccc

    this.sounds = {
      //catch: this.game.add.audio('catch'),
    }

    this.bgs = [
      'bg/country_side', 'bg/hazy_hills', 'bg/sky', 'bg/urban_landscape']
    this.bgIndex = -1

    this.groups = {
      bg: this.game.add.group(),
      ui: this.game.add.group()
    }

    this.cycleBg()

    const frameMargin = 10
    const frameWidth = SCREEN_WIDTH - frameMargin * 2
    const frameY = SCREEN_HEIGHT / 2 + frameMargin
    const frameHeight = SCREEN_HEIGHT / 2 - frameMargin * 2

    const frame = this.game.add.nineSlice(
      frameMargin, frameY, 'frame', null,
      frameWidth / 2, frameHeight / 2)
    frame.scale.setTo(2)
    this.groups.ui.add(frame)

    const margin = 20 + frameMargin

    this.text = this.game.add.bitmapText(
      margin, frameY + 20, 'alagard'
    )
    this.text.maxWidth = SCREEN_WIDTH - margin * 2
    this.text.tint = 0xdeeed6
    this.groups.ui.add(this.text)

    this.bgButton = new Button(
      this.game,
      frameMargin, frameMargin, 'button', 'Cycle BG', this.cycleBg, this)
    this.groups.ui.add(this.bgButton)

    this.playButton = new Button(
      this.game,
      SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, 'button', 'Say!', () => {
        console.log('clicked!')
      }, this)
    this.playButton.anchor.setTo(0.5)
    this.groups.ui.add(this.playButton)
  }

  cycleBg() {
    this.bgIndex = (this.bgIndex + 1) % this.bgs.length
    this.groups.bg.removeAll(true)
    this.bg = this.game.add.image(0, 0, this.bgs[this.bgIndex])
    this.bg.scale.setTo(2)
    this.groups.bg.add(this.bg)
  }

  update() {
    this.text.text = document.getElementById('speech').value
  }

  render() {
  }
}
