const bgs = [
  'bg/country_side', 'bg/hazy_hills', 'bg/sky', 'bg/space',
  'bg/urban_landscape'
]
const sounds = ['beep', 'wib']

class Preset {
  constructor(key, bg, head, sound, soundPitch, soundPitchRange) {
    this.key = key
    this.bg = bg
    this.head = head
    this.sound = sound
    this.soundPitch = soundPitch
    this.soundPitchRange = soundPitchRange
  }
}

const presets = [
  new Preset('alien', 'bg/space', 'heads/reticulan', 'beep', 1, 0),
  new Preset('king', 'bg/hazy_hills', 'heads/king', 'wib', 0.3, 0.01)
]
export {
  presets, bgs, sounds
}
