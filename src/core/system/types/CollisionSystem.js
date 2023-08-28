import componentManager from "../../component/ComponentManager";
import { COMPONENT_TYPES } from "../../consts";

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

const handleCollision = (vel1, vel2) => {
  if (vel1 && vel2) {
    if ((vel1.x > 0 && vel2.x > 0) || (vel1.x < 0 && vel2.x < 0)) {
      vel1.vec.reverseY();
      vel2.vec.reverseY();
      return;
    }
  }
  if (vel1) vel1.vec.reverse();
  if (vel2) vel2.vec.reverse();
};

class CollisionSystem {
  constructor() {
    return this;
  }

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

          if (!collisionModels[0] || !collisionModels[1]) continue;

          if (detectCollision(collisionModels[0], collisionModels[1])) {
            const velocities = [
              componentManager.lookupComponent(
                COMPONENT_TYPES.VELOCITY_COMPONENT_TYPE,
                firstEntity
              ),
              componentManager.lookupComponent(
                COMPONENT_TYPES.VELOCITY_COMPONENT_TYPE,
                secondEntity
              ),
            ];
            handleCollision(velocities[0], velocities[1]);
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
