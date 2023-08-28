import componentManager from "../../component/ComponentManager";
import { COMPONENT_TYPES } from "../../consts";
import entityManager from "../../entity/EntityManager";

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

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const handleCollision = (ent1, ent2) => {
  const vel1 = componentManager.lookupComponent(
    COMPONENT_TYPES.VELOCITY_COMPONENT_TYPE,
    ent1
  );
  const vel2 = componentManager.lookupComponent(
    COMPONENT_TYPES.VELOCITY_COMPONENT_TYPE,
    ent2
  );

  const dest1 = componentManager.lookupComponent(
    COMPONENT_TYPES.DESTRUCTABLE_COMPONENT,
    ent1
  );

  const dest2 = componentManager.lookupComponent(
    COMPONENT_TYPES.DESTRUCTABLE_COMPONENT,
    ent2
  );

  if (dest1) entityManager.removeEntity(ent1.id);
  if (dest2) entityManager.removeEntity(ent2.id);

  // while interesting approach, can probably make this more realistic?
  if (vel1) {
    if (getRndInteger(0, 2) === 1) {
      vel1.vec.reverse();
    } else {
      vel1.vec.reverseY();
    }
  }
  if (vel2) {
    if (getRndInteger(0, 2) === 1) {
      vel2.vec.reverse();
    } else {
      vel2.vec.reverseY();
    }
  }
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
            handleCollision(firstEntity, secondEntity);
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
