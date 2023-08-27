const canvasWidth = 768;
const canvasHeight = 512;

function draw() {
  const canvas = document.getElementById("sandbox");

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.translate(canvasWidth / 2 - 50, canvasHeight / 2 - 50);

  ctx.restore();
  ctx.fillStyle = "blue";
  ctx.translate(25, 25);
  ctx.rotate((1 * Math.PI) / 180);
  ctx.translate(-25, -25);
  ctx.fillRect(0, 0, 50, 50);
  ctx.save();

  //https://stackoverflow.com/questions/47554402/canvas-image-leaves-weird-trail-when-moving-left
  ctx.translate(-canvasWidth / 2 - 50, -canvasHeight / 2 - 50);

  window.requestAnimationFrame(draw);
}

draw();
