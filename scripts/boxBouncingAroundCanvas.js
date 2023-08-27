const canvasWidth = 768;
const canvasHeight = 512;

let xDirection = 1;
let yDirection = 1;

let currentX = 0;
let currentY = 0;
let speed = 1;

function draw() {
  const canvas = document.getElementById("sandbox");

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  ctx.restore();

  const xVelocity = speed * xDirection;
  const yVelocity = speed * yDirection;

  currentX = currentX + xVelocity;
  currentY = currentY + yVelocity;

  ctx.fillStyle = "blue";

  // update y direction
  if (currentX + 50 >= canvasWidth) {
    xDirection = -1;
  }
  if (currentX <= 0) {
    xDirection = 1;
  }

  ctx.translate(xVelocity, yVelocity);

  // update x direction
  if (currentY + 50 >= canvasHeight) {
    yDirection = -1;
  }
  if (currentY <= 0) {
    yDirection = 1;
  }

  ctx.fillRect(0, 0, 50, 50);
  ctx.save();

  window.requestAnimationFrame(draw);
}

draw();
