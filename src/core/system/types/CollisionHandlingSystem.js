import PaddleCollisionComponent from "../../../extensions/component/PaddleCollisionComponent";
import componentManager from "../../component/ComponentManager";
import DestructableComponent from "../../component/types/DestructableComponent";
import LocationComponent from "../../component/types/LocationComponent";
import VelocityComponent from "../../component/types/VelocityComponent";
import { COLLISION_TYPES, X } from "../../consts";
import entityManager from "../../entity/EntityManager";

class CollisionHandlingSystem {
  constructor() {}

  handlePaddleCollision = (paddle, vel, loc) => {
    if (loc) {
      const locx = loc.x;
      if (locx >= paddle.cutPoints[0] && locx <= paddle.cutPoints[1]) {
        if (vel.vec.vec[X] < 0) {
          vel.vec.reverseY();
        } else {
          vel.vec.reverse();
        }
      } else if (locx > paddle.cutPoints[1] && locx <= paddle.cutPoints[2]) {
        if (vel.vec.vec[X] > 0) {
          vel.vec.reverseY();
        } else {
          vel.vec.reverse();
        }
      }
    }
  };

  update(collisions) {
    for (let i = 0; i < collisions.length; i++) {
      const currentCollision = collisions[i];

      if (currentCollision.type === COLLISION_TYPES.OBJECT_TO_OBJECT) {
        const entity1 = entityManager.findEntityById(currentCollision.id1);
        const vel1 = componentManager.lookupComponent(
          VelocityComponent.getComponentId(),
          entity1
        );

        const entity2 = entityManager.findEntityById(currentCollision.id2);
        const vel2 = componentManager.lookupComponent(
          VelocityComponent.getComponentId(),
          entity2
        );
        const dest1 = componentManager.lookupComponent(
          DestructableComponent.getComponentId(),
          entity1
        );

        const dest2 = componentManager.lookupComponent(
          DestructableComponent.getComponentId(),
          entity2
        );

        if (dest1) entityManager.removeEntity(entity1.id);
        if (dest2) entityManager.removeEntity(entity2.id);

        const paddleCollision1 = componentManager.lookupComponent(
          PaddleCollisionComponent.getComponentId(),
          entity1
        );

        const paddleCollision2 = componentManager.lookupComponent(
          PaddleCollisionComponent.getComponentId(),
          entity2
        );

        if (paddleCollision1) {
          const ent2Loc = componentManager.lookupComponent(
            LocationComponent.getComponentId(),
            entity2
          );

          this.handlePaddleCollision(paddleCollision1, vel2, ent2Loc);

          return;
        }

        if (paddleCollision2) {
          const ent1Loc = componentManager.lookupComponent(
            LocationComponent.getComponentId(),
            entity1
          );

          this.handlePaddleCollision(paddleCollision2, vel1, ent1Loc);

          return;
        }

        vel1.vec.reverse();

        vel2.vec.reverse();
      }
    }
  }
}

const collisionHandlingSystem = new CollisionHandlingSystem();

export default collisionHandlingSystem;
