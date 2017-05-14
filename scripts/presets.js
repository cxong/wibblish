class Preset {
  constructor(name, bg, head, sound, soundPitch, soundPitchRange) {
    this.name = name
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
export default presets
