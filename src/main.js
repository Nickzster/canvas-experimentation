import entityManager from "./core/entity/EntityManager";
import Entity from "./core/entity/Entity";
import BoxModelComponent from "./core/component/types/BoxModelComponent";
import BoxCollisionComponent from "./core/component/types/BoxCollisionComponent";
import movementSystem from "./core/system/types/MovementSystem";
import collisionSystem from "./core/system/types/CollisionSystem";
import { CANVAS_HEIGHT, CANVAS_WIDTH, ctx } from "./core/consts";

entityManager
  .addEntity(
    new Entity([
      new BoxModelComponent({
        color: "blue",
        x: 0,
        y: 0,
        w: 50,
        h: 50,
        speed: 1,
      }),
      new BoxCollisionComponent({
        x: 0,
        y: 0,
        w: 50,
        h: 50,
      }),
    ])
  )
  .addEntity(
    new Entity([
      new BoxModelComponent({
        color: "red",
        x: 500,
        y: 20,
        h: 25,
        w: 25,
        speed: 1,
      }),
      new BoxCollisionComponent({
        x: 500,
        y: 20,
        h: 25,
        w: 25,
      }),
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
