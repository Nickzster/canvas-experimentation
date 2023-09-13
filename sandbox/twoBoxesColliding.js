const canvasWidth = 768;
const canvasHeight = 512;

const canvas = document.getElementById("sandbox");

const ctx = canvas.getContext("2d");

const ids = [0, 1];
const MAX_BOXES = 2;

const update = (box) => {
  ctx.save();
  box.y = box.y + 1 * box.speed * box.direction;
  ctx.fillStyle = box.color;
  ctx.translate(box.x, box.y);
  ctx.fillRect(0, 0, 50, 50);

  if (box.y + 50 >= canvasHeight) box.direction = -1;
  if (box.y <= 0) box.direction = 1;

  box.collision.update(box.x, box.y);

  ctx.restore();
};

const pointIsWithinBox = (point, box) => {
  return (
    point[0] >= box.x &&
    point[0] <= box.x + box.w &&
    point[1] >= box.y &&
    point[1] <= box.y + box.h
  );
};

const detectCollision = (box1, box2) =>
  pointIsWithinBox([box1.x, box1.y], box2) ||
  pointIsWithinBox([box1.x + box1.w, box1.y], box2) ||
  pointIsWithinBox([box1.x, box1.y + box1.h], box2) ||
  pointIsWithinBox([box1.x + box1.w, box1.y + box1.h], box2);

const handleCollision = (box1, box2) => {
  box1.direction *= -1;
  box2.direction *= -1;
};

class BoxCollisionModel {
  x = 0;
  y = 0;

  h = 0;
  w = 0;

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;
    return this;
  }

  update(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}

class Box {
  color = "black";
  speed = 1;

  id = -1;

  x = 0;
  y = 0;

  direction = 1;

  collision = undefined;

  constructor(color, speed, startingY = 0, xOffset = 0) {
    this.color = color;
    this.speed = speed;
    this.y = startingY;

    this.id = ids.shift();

    this.collision = new BoxCollisionModel(this.x, this.y, 50, 50);

    this.x = xOffset;
  }

  cleanup() {
    ids.push(this.id);
  }
}

const boxes = [
  new Box("red", 1, 0, 75),
  new Box("green", 3, canvasHeight - 50, 50),
];

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < boxes.length; i++) {
    update(boxes[i]);
  }

  // check for collisions.
  // obviously need to refactor due to O(n^2) complexity

  if (detectCollision(boxes[0].collision, boxes[1].collision)) {
    handleCollision(boxes[0], boxes[1]);
  }

  window.requestAnimationFrame(draw);
}

draw();
