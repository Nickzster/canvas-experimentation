import componentManager from "../../component/ComponentManager";
import { COMPONENT_TYPES, X, Y } from "../../consts";

const pointIsWithinBox = (point, collisionComp) => {
  return (
    point[0] >= collisionComp.x &&
    point[0] <= collisionComp.x + collisionComp.w &&
    point[1] >= collisionComp.y &&
    point[1] <= collisionComp.y + collisionComp.h
  );
};

const detectCollision = (collisionComp1, collisionComp2) =>
  pointIsWithinBox([collisionComp1.x, collisionComp1.y], collisionComp2) ||
  pointIsWithinBox(
    [collisionComp1.x + collisionComp1.w, collisionComp1.y],
    collisionComp2
  ) ||
  pointIsWithinBox(
    [collisionComp1.x, collisionComp1.y + collisionComp1.h],
    collisionComp2
  ) ||
  pointIsWithinBox(
    [collisionComp1.x + collisionComp1.w, collisionComp1.y + collisionComp2.h],
    collisionComp2
  );

const handleCollision = (box1, box2) => {
  box1.direction[X] *= -1;
  box1.direction[Y] *= -1;
  box2.direction[X] *= -1;
  box2.direction[Y] *= -1;
};

class CollisionSystem {
  constructor() {}

  update(entities) {
    // TODO: improve O(n^2) alg
    const collisionMap = new Map();
    for (let i = 0; i < entities.length; i++) {
      for (let j = 0; j < entities.length; j++) {
        const firstEntity = entities[i];
        const secondEntity = entities[j];
        if (
          firstEntity.id !== secondEntity.id &&
          collisionMap.get(firstEntity.id) !== secondEntity
        ) {
          const models = [
            componentManager.lookupComponent(
              COMPONENT_TYPES.BOX_MODEL_COMPONENT_TYPE,
              firstEntity
            ),
            componentManager.lookupComponent(
              COMPONENT_TYPES.BOX_MODEL_COMPONENT_TYPE,
              secondEntity
            ),
          ];

          const collisionModels = [
            componentManager.lookupComponent(
              COMPONENT_TYPES.BOX_COLLISION_COMPONENT_TYPE,
              firstEntity
            ),
            componentManager.lookupComponent(
              COMPONENT_TYPES.BOX_COLLISION_COMPONENT_TYPE,
              secondEntity
            ),
          ];

          if (detectCollision(collisionModels[0], collisionModels[1])) {
            handleCollision(models[0], models[1]);
            collisionMap.set(secondEntity.id, firstEntity);
            collisionMap.set(firstEntity.id, secondEntity);
          }
        }
      }
    }
  }
}

const collisionSystem = new CollisionSystem();

export default collisionSystem;
