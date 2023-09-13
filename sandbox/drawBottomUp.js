const canvasWidth = 768;
const canvasHeight = 512;

function draw() {
  const canvas = document.getElementById("sandbox");

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.translate(0, 512);
  ctx.restore();
  ctx.fillStyle = "blue";
  ctx.translate(0, -1);
  ctx.fillRect(0, 0, 50, 50);
  ctx.save();

  window.requestAnimationFrame(draw);
}

draw();
