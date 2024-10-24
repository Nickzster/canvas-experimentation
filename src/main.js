import entityManager from "./core/entity/EntityManager";
import Entity from "./core/entity/Entity";
import BoxModelComponent from "./core/component/types/BoxModelComponent";
import BoxCollisionComponent from "./core/component/types/BoxCollisionComponent";
import movementSystem from "./core/system/types/MovementSystem";
import collisionSystem from "./core/system/types/CollisionSystem";
import { CANVAS_HEIGHT, CANVAS_WIDTH, X, Y, ctx } from "./core/consts";
import LocationComponent from "./core/component/types/LocationComponent";
import VelocityComponent from "./core/component/types/VelocityComponent";
import KeyboardInputComponent from "./core/component/types/KeyboardInputComponent";
import DestructableComponent from "./core/component/types/DestructableComponent";
import PaddleCollisionComponent from "./extensions/component/PaddleCollisionComponent";
import worldSystem from "./core/system/types/WorldSystem";
import TagComponent from "./core/component/types/TagComponent";
import collisionDetectionSystem from "./core/system/types/CollisionDetectionSystem";
import collisionHandlingSystem from "./core/system/types/CollisionHandlingSystem";
import worldBarrierSystem from "./core/system/types/WorldBarrierSystem";

const BALL_COLOR = "white";
const BRICK_COLOR = "#3a506b";
const PADDLE_COLOR = "#5bc0be";

let paused_multiplier = 1;
/* 
  --theme-100: #0b132b;
  --theme-200: #1c2541;
  --theme-300: #3a506b;
  --theme-400: #5bc0be;
  --theme-500: #6fffe9;

 */

const center = [CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2];

const player = new Entity([
  new BoxModelComponent({
    color: PADDLE_COLOR,
    w: 120,
    h: 15,
  }),
  new PaddleCollisionComponent({ w: 120, h: 15 }),
  new LocationComponent({ x: center[X] - 60, y: CANVAS_HEIGHT - 50 }),
  new VelocityComponent({ x: 0, y: 0, speed: 7 * paused_multiplier }),
  //  new KeyboardInputComponent({ left: "KeyA", right: "KeyD" }),
  new KeyboardInputComponent({ left: "ArrowLeft", right: "ArrowRight" }),
  new TagComponent("player"),
]);

const ball = new Entity([
  new BoxModelComponent({ color: BALL_COLOR, w: 10, h: 10 }),
  new BoxCollisionComponent({ w: 10, h: 10 }),
  new LocationComponent({ x: 524, y: 500 }),
  new VelocityComponent({ x: -1, y: 1, speed: 4 * paused_multiplier }),
  new TagComponent("ball"),
]);
const ball2 = new Entity([
  new BoxModelComponent({ color: BALL_COLOR, w: 10, h: 10 }),
  new BoxCollisionComponent({ w: 10, h: 10 }),
  new LocationComponent({ x: 500, y: 500 }),
  new VelocityComponent({ x: 1, y: 1, speed: 4 * paused_multiplier }),
  new TagComponent("ball"),
]);
const createBrick = ({ x, y, color = "yellow", xComp = 0, speed = 1 }) =>
  new Entity([
    new BoxModelComponent({ color, h: 25, w: 50 }),
    new BoxCollisionComponent({ h: 25, w: 50 }),
    new LocationComponent({ x, y }),
    new VelocityComponent({ x: xComp, y: 0, speed }),
    new DestructableComponent(),
    new TagComponent(`${color} brick`),
  ]);

//entityManager.addEntity(player).addEntity(ball);
setTimeout(() => entityManager.addEntity(ball).addEntity(ball2), 5000);

const bricks = [
  [
    [100, 100 + 30 * 0],
    [100, 100 + 30 * 1],
    [100, 100 + 30 * 2],
    [100, 100 + 30 * 3],
    [100, 100 + 30 * 4],
    [100, 100 + 30 * 5],
    [100, 100 + 30 * 6],
    [100, 100 + 30 * 7],
  ],
  [[100 + 55 * 1, 100 + 30 * 0]],
  [[100 + 55 * 2, 100 + 30 * 0]],
  [
    [100 + 55 * 3, 100 + 30 * 0],
    [100 + 55 * 3, 100 + 30 * 1],
    [100 + 55 * 3, 100 + 30 * 2],
    [100 + 55 * 3, 100 + 30 * 3],
    [100 + 55 * 3, 100 + 30 * 4],
    [100 + 55 * 3, 100 + 30 * 5],
    [100 + 55 * 3, 100 + 30 * 6],
    [100 + 55 * 3, 100 + 30 * 7],
  ],
  [
    [100 + 55 * 5, 100 + 30 * 0],
    [100 + 55 * 5, 100 + 30 * 1],
    [100 + 55 * 5, 100 + 30 * 2],
    [100 + 55 * 5, 100 + 30 * 3],
    [100 + 55 * 5, 100 + 30 * 4],
    [100 + 55 * 5, 100 + 30 * 5],
    [100 + 55 * 5, 100 + 30 * 6],
    [100 + 55 * 5, 100 + 30 * 7],
  ],
  [
    [100 + 55 * 7, 100 + 30 * 0],
    [100 + 55 * 7, 100 + 30 * 1],
    [100 + 55 * 7, 100 + 30 * 2],
    [100 + 55 * 7, 100 + 30 * 3],
    [100 + 55 * 7, 100 + 30 * 4],
    [100 + 55 * 7, 100 + 30 * 5],
    [100 + 55 * 7, 100 + 30 * 6],
    [100 + 55 * 7, 100 + 30 * 7],
  ],
  [
    [100 + 55 * 8, 100 + 30 * 0],
    [100 + 55 * 8, 100 + 30 * 7],
  ],
  [
    [100 + 55 * 9, 100 + 30 * 0],
    [100 + 55 * 9, 100 + 30 * 7],
  ],
  [
    [100 + 55 * 11, 100 + 30 * 0],
    [100 + 55 * 11, 100 + 30 * 1],
    [100 + 55 * 11, 100 + 30 * 2],
    [100 + 55 * 11, 100 + 30 * 3],
    [100 + 55 * 11, 100 + 30 * 4],
    [100 + 55 * 11, 100 + 30 * 5],
    [100 + 55 * 11, 100 + 30 * 6],
    [100 + 55 * 11, 100 + 30 * 7],
  ],
  [
    [100 + 55 * 12, 100 + 30 * 2],
    [100 + 55 * 12, 100 + 30 * 5],
  ],
  [
    [100 + 55 * 13, 100 + 30 * 2],
    [100 + 55 * 13, 100 + 30 * 5],
  ],
  [
    [100 + 55 * 14, 100 + 30 * 0],
    [100 + 55 * 14, 100 + 30 * 1],
    [100 + 55 * 14, 100 + 30 * 2],
    [100 + 55 * 14, 100 + 30 * 5],
    [100 + 55 * 14, 100 + 30 * 6],
    [100 + 55 * 14, 100 + 30 * 7],
  ],
];

for (let i = 0; i < bricks.length; i++) {
  const row = bricks[i];
  for (let j = 0; j < row.length; j++) {
    const [x, y] = row[j];
    entityManager.addEntity(createBrick({ color: BRICK_COLOR, x, y }));
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (paused_multiplier === 1) paused_multiplier = 0;
    else paused_multiplier = 1;
  }
});

function draw() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const objects = entityManager.entities;

  worldSystem.update(objects);
  const collisions = collisionDetectionSystem.update(objects);
  collisionHandlingSystem.update(collisions);
  worldBarrierSystem.update(objects);

  movementSystem.update(objects);

  window.requestAnimationFrame(draw);
}

draw();
