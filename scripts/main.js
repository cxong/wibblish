import Phaser from 'phaser'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './graphics'

export default class extends Phaser.State {
  preload() {
    this.resetKeys();
  }

  create() {
    this.game.stage.backgroundColor = 0x4f3458;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.sounds = {
      //catch: this.game.add.audio('catch'),
    }

    this.groups = {
      //ground: this.game.add.group(),
    }

    this.text = this.game.add.text(
      SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, '', {
        font: '36px VT323', fill: '#fff', align: 'center'
      }
    );
    this.text.anchor.setTo(0.5)
    this.groups.ui.add(this.text)
  }

  update() {
  }

  render() {
  }
}
