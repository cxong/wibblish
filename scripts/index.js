import Phaser from 'phaser'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './graphics'
import BootState from './boot'
import PreloadState from './preload'
import GameState from './main'

class Game extends Phaser.Game {
  constructor() {
    const transparent = false
    const antialias = false
    super(
      SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, 'gameContainer', null,
      transparent, antialias)
    document.getElementById('fontLoader').style.display = 'none';
    this.state.add('Boot', BootState);
    this.state.add('Preload', PreloadState);
    this.state.add('Game', GameState);
    this.state.start('Boot');
  }
}

window.game = new Game()
