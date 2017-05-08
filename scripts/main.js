import Phaser from 'phaser'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './graphics'
import Button from './button'
import Generator from './generator/main'
import Head from './head'
import SliderButton from './slider_button'

const CHAR_FRAMES = 5

const yRatio = SCREEN_HEIGHT * 3 / 5
const frameMargin = 10
const frameWidth = SCREEN_WIDTH - frameMargin * 2
const frameY = yRatio + frameMargin
const frameHeight = SCREEN_HEIGHT - yRatio - frameMargin * 2

export default class extends Phaser.State {
  preload() {
  }

  create() {
    this.game.stage.backgroundColor = 0xcccccc

    this.groups = {
      bg: this.game.add.group(),
      head: this.game.add.group(),
      ui: this.game.add.group()
    }

    this.bgs = [
      'bg/country_side', 'bg/hazy_hills', 'bg/sky', 'bg/space',
      'bg/urban_landscape']
    this.bgIndex = 2
    this.cycleBg()

    this.heads = ['heads/king', 'heads/monk', 'heads/reticulan']
    this.headScales = [6, 6, 3]
    this.headIndex = 1
    this.cycleHead()

    this.sounds = ['beep', 'wib'].map((sound) => {
      return this.game.add.audio(sound)
    })
    this.soundIndex = -1
    this.soundPitch = 1
    this.cycleSound()

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

    this.resetText()

    var buttonX = frameMargin
    const bgButton = new Button(
      this.game,
      buttonX, frameMargin, 'button', 'Cycle BG', 'alagard', 18,
      this.cycleBg, this)
    bgButton.label.tint = 0xdeeed6
    this.groups.ui.add(bgButton)

    buttonX += bgButton.width + frameMargin
    const headButton = new Button(
      this.game,
      buttonX, frameMargin, 'button', 'Cycle Head', 'alagard', 18,
      this.cycleHead, this)
    headButton.label.tint = 0xdeeed6
    this.groups.ui.add(headButton)

    buttonX += headButton.width + frameMargin
    const soundButton = new Button(
      this.game,
      buttonX, frameMargin, 'button', 'Cycle Sound', 'alagard', 18,
      this.cycleSound, this)
    soundButton.label.tint = 0xdeeed6
    this.groups.ui.add(soundButton)

    buttonX += soundButton.width + frameMargin
    const pitchButton = new SliderButton(
      this.game,
      buttonX, frameMargin, 'button', 'Pitch: ', 'alagard', 18,
      (button, d) => {
        this.soundPitch += d.x
        this.soundPitch -= d.y
        this.soundPitch = Math.min(8, Math.max(0.1, this.soundPitch))
        button.setLabel(this.soundPitch)
      }
    )
    pitchButton.label.tint = 0xdeeed6
    this.groups.ui.add(pitchButton)

    this.playButton = new Button(
      this.game,
      10, SCREEN_HEIGHT / 2, 'button', 'Say!', 'alagard', 32,
      () => {
        this.resetText()
      }, this)
    this.playButton.label.tint = 0xdeeed6
    this.groups.ui.add(this.playButton)

    this.generator = new Generator()

    this.generateButton = new Button(
      this.game,
      100, SCREEN_HEIGHT / 2, 'button', 'Generate', 'alagard', 32,
      () => {
        document.getElementById('speech').value = this.generator.generateText(1, 0)
      }, this)
    this.generateButton.label.tint = 0xdeeed6
    this.groups.ui.add(this.generateButton)
  }

  cycleBg() {
    this.bgIndex = (this.bgIndex + 1) % this.bgs.length
    this.groups.bg.removeAll(true)
    this.bg = this.game.add.image(0, 0, this.bgs[this.bgIndex])
    this.bg.scale.setTo(2)
    this.groups.bg.add(this.bg)
  }

  cycleHead() {
    this.headIndex = (this.headIndex + 1) % this.heads.length
    this.groups.head.removeAll(true)
    this.head = new Head(
      this.game, SCREEN_WIDTH / 2, frameY, this.heads[this.headIndex],
      this.headScales[this.headIndex])
    this.groups.head.add(this.head)
  }

  cycleSound() {
    this.soundIndex = (this.soundIndex + 1) % this.sounds.length
    this.sound = this.sounds[this.soundIndex]
  }

  resetText() {
    this.nextCharTimer = 0
    this.charIndex = 0
    this.text.text = ''
  }

  update() {
    const text = document.getElementById('speech').value

    if (text.startsWith(this.text.text)) {
      if (this.charIndex < text.length) {
        this.nextCharTimer--
        if (this.nextCharTimer <= 0) {
          this.charIndex++
          this.text.text = text.substring(0, this.charIndex)
          this.nextCharTimer = CHAR_FRAMES
          const newChar = this.text.text[this.charIndex - 1]
          if (!/\s/.test(newChar)) {
            this.sound.play()
            this.sound._sound.playbackRate.value = this.soundPitch
            if ((/^[aeiouy]$/i).test(newChar)) {
              this.head.mouthOpen()
            } else {
              this.head.mouthClose()
            }
          }
        }
      }
    } else {
      this.resetText()
    }
  }

  render() {
  }
}
