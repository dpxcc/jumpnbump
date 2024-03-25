new Phaser.Game({
  type: Phaser.WebGL,
  canvas: canvas,
  scene,
  input: {
    touch: true
  },
  plugins,
  scale: {
    width: 720,
    height: 1280,
    mode: Phaser.Scale.RESIZE
  }
});
