const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const x_canvasWidth = canvas.width = 400;
const x_canvasHeight = canvas.height = 256;

const level = {};
level.level = new Image();
level.level.src = "levels/default/level.png";
level.mask = new Image();
level.mask.src = "levels/default/mask.png";

function render() {
  ctx.clearRect(0, 0, x_canvasWidth, x_canvasHeight);
  ctx.drawImage(level.level, 0, 0);
  ctx.drawImage(level.mask, 0, 0);
  requestAnimationFrame(render);
}
render();
