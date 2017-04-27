import Phaser from 'phaser'

export default class extends Phaser.State {
  init() {
    // Stretch to fit screen, but maintain aspect ratio
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.scale.pageAlignHorizontally = true;
    this.game.scale.pageAlignVertically = true;
    this.game.scale.compatibility.forceMinimumDocumentHeight = true;
    this.game.scale.windowConstraints = {'right': 'layout', 'bottom': 'layout'}
    this.game.renderer.renderSession.roundPixels = true
  }

  preload() {
    this.game.load.spritesheet(
      'merc', 'images/merc.png', 32, 32
    );
  }

  create() {
    this.game.stage.backgroundColor = 0x000000;
    this.input.maxPointers = 1;

    this.state.start('Preload');
  }
}
