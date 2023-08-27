function draw() {
  const canvas = document.getElementById("sandbox");

  const ctx = canvas.getContext("2d");
  // ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.fillStyle = "blue";

  ctx.translate(canvasWidth / 2 - 50, canvasHeight / 2 - 50);
  ctx.save();

  ctx.translate(50 / 2, 50 / 2);
  ctx.rotate((1 * Math.PI) / 180);
  ctx.translate(-50 / 2, -50 / 2);
  ctx.fillRect(0, 0, 50, 50);
  ctx.restore();

  //window.requestAnimationFrame(draw);
}

draw();
