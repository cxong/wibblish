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

    const margin = 10
    this.text = this.game.add.text(
      margin, SCREEN_HEIGHT / 2 + margin, '', {
        font: '36px VT323',
        fill: '#212121'
      }
    )
    this.groups.ui.add(this.text)
  }

  update() {
    this.text.text = document.getElementById('speech').value
  }

  render() {
  }
}
