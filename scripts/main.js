import Phaser from 'phaser'
import Assets from './assets'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './graphics'

import Button from './button'
import Generator from './generator/main'
import Head from './head'
import { presets, bgs, sounds } from './presets'

const CHAR_FRAMES = 3

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

  cyclePreset() {
    this.presetIndex = (this.presetIndex + 1) % presets.length
  }

  resetText() {
    this.nextCharTimer = 0
    this.charIndex = 0
    this.text.text = ''
  }

  update() {
    const updateOption = (id, options, objKey, getKey, addFunc) => {
      const index = document.getElementById(id).value
      const option = options[index]
      const key = getKey(option)
      if (!this[objKey] || key !== this[objKey].key) {
        this[objKey] = addFunc(option)
      }
    }
    updateOption(
      'preset', presets, 'preset', (option) => { return option.key },
      (option) => {
        document.getElementById('bg').value = bgs.indexOf(option.bg)
        document.getElementById('head').value = Assets.heads.findIndex((head) => {
          return head[0] === option.head
        })
        document.getElementById('sound').value = Assets.sounds.indexOf(option.sound)
        document.getElementById('pitch').value = option.soundPitch
        document.getElementById('pitchRange').value = option.soundPitchRange
        return option
      })
    updateOption(
      'bg', bgs, 'bg', (option) => { return option },
      (option) => {
        this.groups.bg.removeAll(true)
        const bg = this.game.add.image(0, 0, option)
        bg.scale.setTo(2)
        this.groups.bg.add(bg)
        return bg
      })
    updateOption(
      'head', Assets.heads, 'head', (option) => { return option[0] },
      (option) => {
        this.groups.head.removeAll(true)
        const head = new Head(
          this.game, SCREEN_WIDTH / 2, frameY, option[0], option[1])
        this.groups.head.add(head)
        return head
      })
    updateOption(
      'sound', sounds, 'sound', (option) => { return option },
      (option) => {
        return this.game.add.audio(option)
      })

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
            let pitch = parseFloat(document.getElementById('pitch').value)
            const pitchRange = parseFloat(document.getElementById('pitchRange').value)
            pitch += Math.random() * pitchRange
            if (pitch < 0.1) {
              pitch = 0.1
            } else if (pitch > 8) {
              pitch = 8
            }
            if (this.sound._sound) {
              this.sound._sound.playbackRate.value = pitch
            }
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
