import Phaser from 'phaser'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './graphics'
import BootState from './boot'
import PreloadState from './preload'
import GameState from './main'
import { bgs } from './presets'

const dropdowns = document.getElementById('dropdowns')

const outer = document.createElement('div')
const label = document.createElement('label')
label.innerHTML = 'Background'
outer.appendChild(label)
const select = document.createElement('select')
select.setAttribute('id', 'bg')
select.classList.add('browser-default')
for (let bg of bgs) {
  const option = document.createElement('option')
  option.setAttribute('value', bg)
  option.innerHTML = bg
  select.appendChild(option)
}
outer.appendChild(select)
dropdowns.appendChild(outer)

class Game extends Phaser.Game {
  constructor() {
    const transparent = false
    const antialias = false
    super(
      SCREEN_WIDTH, SCREEN_HEIGHT, Phaser.AUTO, 'gameContainer', null,
      transparent, antialias)
    this.state.add('Boot', BootState)
    this.state.add('Preload', PreloadState)
    this.state.add('Game', GameState)
    this.state.start('Boot')
  }
}

window.game = new Game()
