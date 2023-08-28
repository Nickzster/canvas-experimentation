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

const center = [CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2];

const player = new Entity([
  new BoxModelComponent({
    color: "black",
    w: 120,
    h: 30,
  }),
  new BoxCollisionComponent({
    w: 120,
    h: 30,
  }),
  new LocationComponent({ x: center[X] - 100, y: CANVAS_HEIGHT - 40 }),
  new VelocityComponent({ x: 0, y: 0, speed: 5 }),
  new KeyboardInputComponent({ left: "KeyA", right: "KeyD" }),
]);

const ball = new Entity([
  new BoxModelComponent({ color: "blue", w: 10, h: 10 }),
  new BoxCollisionComponent({ w: 10, h: 10 }),
  new LocationComponent({ x: 10, y: 10 }),
  new VelocityComponent({ x: 1, y: 1, speed: 5 }),
]);

const brick = new Entity([
  new BoxModelComponent({ color: "yellow", h: 25, w: 50 }),
  new BoxCollisionComponent({ w: 50, h: 25 }),
  new LocationComponent({ x: center[X] - 25, y: center[Y] - 12.5 }),
  new DestructableComponent(),
]);

entityManager.addEntity(player).addEntity(ball).addEntity(brick);
function draw() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const objects = entityManager.entities;

  movementSystem.update(objects);
  collisionSystem.update(objects);

  window.requestAnimationFrame(draw);
}

draw();
