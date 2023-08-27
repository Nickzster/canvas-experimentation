const canvasWidth = 768;
const canvasHeight = 512;

let xDirection = 1;
let yDirection = 1;

let currentX = 0;
let currentY = 0;
let speed = 1;

const X = 0;
const Y = 1;

const canvas = document.getElementById("sandbox");
const ctx = canvas.getContext("2d");

const update = (box) => {
  ctx.save();
  box.location[X] = box.location[X] + 1 * box.speed * box.direction[X];
  box.location[Y] = box.location[Y] + 1 * box.speed * box.direction[Y];
  ctx.fillStyle = box.color;

  ctx.translate(box.location[X], box.location[Y]);

  ctx.fillRect(0, 0, 50, 50);

  if (box.location[X] + 50 >= canvasWidth) box.direction[X] = -1;
  if (box.location[X] <= 0) box.direction[X] = 1;

  if (box.location[Y] + 50 >= canvasHeight) box.direction[Y] = -1;
  if (box.location[Y] <= 0) box.direction[Y] = 1;

  ctx.restore();
};

class Box {
  color = "black";
  speed = 1;

  location = [0, 0]; //x,y
  direction = [1, 1]; //x,y

  constructor(color) {
    this.color = color;
    return this;
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
    return this;
  }

  setStartingLocation(x, y) {
    this.location[X] = x;
    this.location[Y] = y;
    return this;
  }
}

const box = new Box("blue").setSpeed(2);

const objects = [
  new Box("blue").setSpeed(2),
  new Box("red").setSpeed(1).setStartingLocation(50, 50),
  new Box("green").setSpeed(3).setStartingLocation(300, 0),
];

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < objects.length; i++) {
    update(objects[i]);
  }

  window.requestAnimationFrame(draw);
}

draw();
