import Phaser from 'phaser'
import Assets from './assets'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './graphics'

import Button from './button'
import Generator from './generator/main'
import Head from './head'
import SliderButton from './slider_button'
import { presets, bgs } from './presets'

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

    this.presetIndex = 0

    this.sounds = ['beep', 'wib'].map((sound) => {
      return this.game.add.audio(sound)
    })
    this.soundIndex = -1
    this.soundPitch = 1
    this.soundPitchRange = 0
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
    var buttonY = frameMargin

    const presetButton = new Button(
      this.game,
      buttonX, buttonY, 'button', 'Cycle Preset', 'alagard', 18,
      this.cyclePreset, this)
    presetButton.label.tint = 0xdeeed6
    this.groups.ui.add(presetButton)

    buttonX = frameMargin
    buttonY += presetButton.height + frameMargin
    const soundButton = new Button(
      this.game,
      buttonX, buttonY, 'button', 'Cycle Sound', 'alagard', 18,
      this.cycleSound, this)
    soundButton.label.tint = 0xdeeed6
    this.groups.ui.add(soundButton)

    buttonX += soundButton.width + frameMargin
    const pitchButton = new SliderButton(
      this.game,
      buttonX, buttonY, 'button', 'Pitch: ', 'alagard', 18,
      (button, d) => {
        this.soundPitch += d.x
        this.soundPitch -= d.y
        this.soundPitch = Math.min(8, Math.max(0.1, this.soundPitch))
        button.setLabel(this.soundPitch)
      }
    )
    pitchButton.label.tint = 0xdeeed6
    this.groups.ui.add(pitchButton)

    buttonX += pitchButton.width + frameMargin
    const pitchRangeButton = new SliderButton(
      this.game,
      buttonX, buttonY, 'button', 'P. Range: ', 'alagard', 18,
      (button, d) => {
        this.soundPitchRange += d.x
        this.soundPitchRange -= d.y
        this.soundPitchRange =
          Math.min(this.soundPitch * 2, Math.max(0, this.soundPitchRange))
        button.setLabel(this.soundPitchRange)
      }
    )
    pitchRangeButton.label.tint = 0xdeeed6
    this.groups.ui.add(pitchRangeButton)

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

    const findPreset = (array, matchFunc, index, cycleFunc) => {
      for (var i = 0; i < array.length; i++) {
        if (matchFunc(array[i])) {
          this[index] = i - 1
          this[cycleFunc]()
          break
        }
      }
    }
    findPreset(
      this.sounds,
      (sound) => { return sound.key === presets[this.presetIndex].sound },
      'soundIndex', 'cycleSound')
    this.soundPitch = presets[this.presetIndex].soundPitch
    this.soundPitchRange = presets[this.presetIndex].soundPitchRange
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
    const updateOption = (id, options, objKey, getKey, group, addFunc) => {
      const index = document.getElementById(id).value
      const option = options[index]
      const key = getKey(option)
      if (!this[objKey] || key !== this[objKey].key) {
        group.removeAll(true)
        this[objKey] = addFunc(option)
        group.add(this[objKey])
      }
    }
    updateOption(
      'bg', bgs, 'bg', (option) => { return option }, this.groups.bg,
      (option) => {
        const bg = this.game.add.image(0, 0, option)
        bg.scale.setTo(2)
        return bg
      })
    updateOption(
      'head', Assets.heads, 'head', (option) => { return option[0] },
      this.groups.head,
      (option) => {
        return new Head(
          this.game, SCREEN_WIDTH / 2, frameY, option[0], option[1])
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
            this.sound._sound.playbackRate.value =
              this.soundPitch + (0.5 - Math.random()) * this.soundPitchRange
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
