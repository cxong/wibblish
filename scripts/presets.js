const bgs = [
  'bg/country_side', 'bg/hazy_hills', 'bg/palace', 'bg/school', 'bg/sky',
  'bg/space',
  'bg/urban_landscape'
]
const sounds = ['beep', 'ugh', 'wib']

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
  new Preset('king', 'bg/hazy_hills', 'heads/king', 'wib', 0.3, 0.01),
  new Preset('courtesan', 'bg/palace', 'heads/courtesan', 'wib', 1.2, 0.2),
  new Preset('ogre', 'bg/country_side', 'heads/ogre', 'ugh', 0.6, 0.2)
]
export {
  presets, bgs, sounds
}
