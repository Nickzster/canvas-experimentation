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
  box1.direction[X] *= -1;
  box1.direction[Y] *= -1;
  box2.direction[X] *= -1;
  box2.direction[Y] *= -1;
};

const update = (box) => {
  ctx.save();
  box.location[X] = box.location[X] + 1 * box.speed * box.direction[X];
  box.location[Y] = box.location[Y] + 1 * box.speed * box.direction[Y];
  ctx.fillStyle = box.color;

  ctx.translate(box.location[X], box.location[Y]);

  ctx.fillRect(0, 0, box.w, box.h);

  box.collision.updateLoc(box.location[X], box.location[Y]);

  if (box.location[X] + box.w >= canvasWidth) box.direction[X] = -1;
  if (box.location[X] <= 0) box.direction[X] = 1;

  if (box.location[Y] + box.h >= canvasHeight) box.direction[Y] = -1;
  if (box.location[Y] <= 0) box.direction[Y] = 1;

  ctx.restore();
};

class BoxCollisionModel {
  x = 0;
  y = 0;

  h = 0;
  w = 0;

  w = 0;
  h = 0;

  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.h = h;
    this.w = w;

    return this;
  }

  updateLoc(newX, newY) {
    this.x = newX;
    this.y = newY;
  }

  updateSize(newW, newH) {
    this.w = newW;
    this.h = newH;
  }
}

class Box {
  color = "black";
  speed = 1;

  location = [0, 0]; //x,y
  direction = [1, 1]; //x,y

  collision = undefined;

  w = 0;
  h = 0;

  id = -1;

  constructor(color) {
    this.color = color;
    this.collision = new BoxCollisionModel(
      this.location[X],
      this.location[Y],
      this.w,
      this.h
    );
    return this;
  }

  setId(newId) {
    this.id = newId;
    return this;
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
    return this;
  }

  setStartingLocation(x, y) {
    this.location[X] = x;
    this.location[Y] = y;
    this.collision.updateLoc(x, y);
    return this;
  }

  setSize(w, h) {
    this.w = w;
    this.h = h;
    this.collision.updateSize(w, h);
    return this;
  }
}

const box = new Box("blue").setSpeed(2);

const objects = [
  new Box("blue")
    .setSpeed(5)
    .setId(0)
    .setSize(20, 20)
    .setStartingLocation(0, 0),
  new Box("red")
    .setSpeed(5)
    .setStartingLocation(200, 50)
    .setId(1)
    .setSize(10, 10),
  new Box("green")
    .setSpeed(5)
    .setStartingLocation(300, 0)
    .setId(2)
    .setSize(100, 100),
  new Box("purple")
    .setSpeed(5)
    .setStartingLocation(600, 400)
    .setId(3)
    .setSize(25, 25),
  new Box("yellow")
    .setSpeed(5)
    .setStartingLocation(500, 0)
    .setId(4)
    .setSize(50, 50),
  new Box("orange")
    .setSpeed(5)
    .setStartingLocation(0, 400)
    .setId(5)
    .setSize(75, 75),
];

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  for (let i = 0; i < objects.length; i++) {
    update(objects[i]);
  }
  // todo: improve O(n^2) alg
  const collisionMap = new Map();
  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < objects.length; j++) {
      if (
        objects[i].id !== objects[j].id &&
        collisionMap.get(objects[i].id) !== objects[j]
      ) {
        if (detectCollision(objects[i].collision, objects[j].collision)) {
          handleCollision(objects[i], objects[j]);
          collisionMap.set(objects[j].id, objects[i]);
          collisionMap.set(objects[i].id, objects[j]);
        }
      }
    }
  }

  window.requestAnimationFrame(draw);
}

draw();
