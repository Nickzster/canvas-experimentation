const canvasWidth = 768;
const canvasHeight = 512;

const canvas = document.getElementById("sandbox");

const ctx = canvas.getContext("2d");

const update = (box) => {
  ctx.save();
  box.y = box.y + 1 * box.speed * box.direction;
  ctx.fillStyle = box.color;
  ctx.translate(box.x, box.y);
  ctx.fillRect(0, 0, 50, 50);

  if (box.y + 50 >= canvasHeight) box.direction = -1;
  if (box.y <= 0) box.direction = 1;
  ctx.restore();
};

class Box {
  color = "black";
  speed = 1;

  x = 0;
  y = 10;

  direction = 1;

  constructor(color, speed, startingX = 0) {
    this.color = color;
    this.speed = speed;
    this.x = startingX;
  }
}

const boxes = [
  new Box("red", 1),
  new Box("green", 2, 100),
  new Box("blue", 3, 200),
];

const box = new Box("red", 1);
const box2 = new Box("blue", 2);

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < boxes.length; i++) {
    update(boxes[i]);
  }

  window.requestAnimationFrame(draw);
}

draw();
