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

const center = [CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2];

const player = new Entity([
  new BoxModelComponent({
    color: "black",
    w: 120,
    h: 15,
  }),
  new PaddleCollisionComponent({ w: 120, h: 15 }),
  new LocationComponent({ x: center[X] - 60, y: CANVAS_HEIGHT - 50 }),
  new VelocityComponent({ x: 0, y: 0, speed: 7 }),
  new KeyboardInputComponent({ left: "KeyA", right: "KeyD" }),
  new TagComponent("player"),
]);

const ball = new Entity([
  new BoxModelComponent({ color: "blue", w: 10, h: 10 }),
  new BoxCollisionComponent({ w: 10, h: 10 }),
  new LocationComponent({ x: 10, y: 10 }),
  new VelocityComponent({ x: 1, y: 1, speed: 5 }),
  new TagComponent("ball"),
]);

const createBrick = ({ x, y, color = "yellow", xComp = 0, speed = 1 }) =>
  new Entity([
    new BoxModelComponent({ color, h: 25, w: 50 }),
    new BoxCollisionComponent({ w: 50, h: 25 }),
    new LocationComponent({ x, y }),
    new VelocityComponent({ x: xComp, y: 0, speed }),
    new DestructableComponent(),
    new TagComponent(`${color} brick`),
  ]);

entityManager.addEntity(player).addEntity(ball);

const xOffsets = [
  50,
  50 * 2 + 10,
  50 * 3 + 20,
  50 * 4 + 30,
  50 * 5 + 40,
  50 * 6 + 50,
  50 * 7 + 60,
  50 * 8 + 70,
  50 * 9 + 80,
  50 * 10 + 90,
  50 * 11 + 100,
  50 * 12 + 110,
  50 * 13 + 120,
  50 * 14 + 130,
  50 * 15 + 140,
];

const yOffsets = [100, 100 + 35, 135 + 35, 170 + 35, 205 + 35];

for (let i = 0; i < xOffsets.length; i++) {
  for (let j = 0; j < yOffsets.length; j++) {
    entityManager.addEntity(
      createBrick({ color: "red", x: xOffsets[i], y: yOffsets[j] })
    );
  }
}

function draw() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const objects = entityManager.entities;

  movementSystem.update(objects);

  worldSystem.update(objects);
  const collisions = collisionDetectionSystem.update(objects);
  collisionHandlingSystem.update(collisions);
  worldBarrierSystem.update(objects);

  window.requestAnimationFrame(draw);
}

draw();
