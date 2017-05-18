import Phaser from 'phaser'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './graphics'
import BootState from './boot'
import PreloadState from './preload'
import GameState from './main'
import { presets, bgs } from './presets'
import assets from './assets'

const dropdowns = document.getElementById('dropdowns')

function makeDropdown(labelInner, selectId, elements) {
  const outer = document.createElement('div')
  const label = document.createElement('label')
  label.innerHTML = labelInner
  outer.appendChild(label)
  const select = document.createElement('select')
  select.setAttribute('id', selectId)
  select.classList.add('browser-default')
  for (var i = 0; i < elements.length; i++) {
    const element = elements[i]
    const option = document.createElement('option')
    option.setAttribute('value', i)
    option.innerHTML = element
    select.appendChild(option)
  }
  outer.appendChild(select)
  dropdowns.appendChild(outer)
}
makeDropdown('Background', 'bg', bgs)
makeDropdown('Head', 'head', assets.heads.map((head) => { return head[0] }))

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
