import entityManager from "./core/entity/EntityManager";
import Entity from "./core/entity/Entity";
import BoxModelComponent from "./core/component/types/BoxModelComponent";
import BoxCollisionComponent from "./core/component/types/BoxCollisionComponent";
import movementSystem from "./core/system/types/MovementSystem";
import collisionSystem from "./core/system/types/CollisionSystem";
import { CANVAS_HEIGHT, CANVAS_WIDTH, X, Y, ctx } from "./core/consts";
import LocationComponent from "./core/component/types/LocationComponent";
import VelocityComponent from "./core/component/types/VelocityComponent";

const center = [CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2];

const OFFSET = 30;

entityManager
  .addEntity(
    new Entity([
      new BoxModelComponent({
        color: "blue",
        w: 50,
        h: 50,
      }),
      new BoxCollisionComponent({
        w: 50,
        h: 50,
      }),
      new LocationComponent({ x: center[X] - OFFSET, y: center[Y] + OFFSET }),
      new VelocityComponent({ x: -1, y: 1, speed: 1 }),
    ])
  )
  .addEntity(
    new Entity([
      new BoxModelComponent({
        color: "red",
        w: 50,
        h: 50,
      }),
      new BoxCollisionComponent({
        w: 50,
        h: 50,
      }),
      new LocationComponent({ x: center[X] + OFFSET, y: center[Y] + OFFSET }),
      new VelocityComponent({ x: 1, y: 1, speed: 2 }),
    ])
  )
  .addEntity(
    new Entity([
      new BoxModelComponent({
        color: "yellow",
        w: 50,
        h: 50,
      }),
      new BoxCollisionComponent({
        w: 50,
        h: 50,
      }),
      new LocationComponent({ x: center[X] - OFFSET, y: center[Y] - OFFSET }),
      new VelocityComponent({ x: -1, y: -1, speed: 3 }),
    ])
  )
  .addEntity(
    new Entity([
      new BoxModelComponent({
        color: "green",
        w: 50,
        h: 50,
      }),
      new BoxCollisionComponent({
        w: 50,
        h: 50,
      }),
      new LocationComponent({ x: center[X] + OFFSET, y: center[Y] - OFFSET }),
      new VelocityComponent({ x: 1, y: -1, speed: 4 }),
    ])
  )
  .addEntity(
    new Entity([
      new BoxModelComponent({
        color: "purple",
        w: 50,
        h: 50,
      }),
      new BoxCollisionComponent({
        w: 50,
        h: 50,
      }),
      new LocationComponent({ x: 1, y: 1 }),
      new VelocityComponent({ x: 1, y: 0, speed: 5 }),
    ])
  )
  .addEntity(
    new Entity([
      new BoxModelComponent({
        color: "orange",
        w: 50,
        h: 50,
      }),
      new BoxCollisionComponent({
        w: 50,
        h: 50,
      }),
      new LocationComponent({ x: CANVAS_WIDTH - 51, y: 1 }),
      new VelocityComponent({ x: 0, y: 1, speed: 6 }),
    ])
  );
function draw() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const objects = entityManager.entities;

  movementSystem.update(objects);
  collisionSystem.update(objects);

  window.requestAnimationFrame(draw);
}

draw();
