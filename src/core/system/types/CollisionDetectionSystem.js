import PaddleCollisionComponent from "../../../extensions/component/PaddleCollisionComponent";
import componentManager from "../../component/ComponentManager";
import BoxCollisionComponent from "../../component/types/BoxCollisionComponent";
import LocationComponent from "../../component/types/LocationComponent";
import { COLLISION_TYPES } from "../../consts";
import worldSystem from "./WorldSystem";

const newOutOfBoundsCollision = ({ x, y, id }) => ({
  type: COLLISION_TYPES.OUT_OF_BOUNDS,
  x,
  y,
  id1: id,
  id2: null,
});

const newObjectToObjectCollision = ({ x, y, id1, id2 }) => ({
  type: COLLISION_TYPES.OBJECT_TO_OBJECT,
  x,
  y,
  id1,
  id2,
});

class CollisionDetectionSystem {
  constructor() {}

  checkForOutOfBoundsY(y) {
    return y < 0 || y >= worldSystem.height;
  }

  checkForOutOfBoundsX(x) {
    return x < 0 || x >= worldSystem.width;
  }

  handleOutOfBoundsCheck({ x, y }) {
    if (this.checkForOutOfBoundsX(x)) {
      return true;
    }

    if (this.checkForOutOfBoundsY(y)) {
      return true;
    }

    return false;
  }

  checkAdjacent({ x, y, id, collisionsArray, collisionsMap }) {
    if (this.handleOutOfBoundsCheck({ x, y })) return;

    const adjacent = worldSystem.world[x][y];
    if (
      adjacent !== undefined &&
      adjacent !== id &&
      collisionsMap.get(adjacent) !== id
    ) {
      //console.log(worldSystem.world);
      collisionsArray.push(
        newObjectToObjectCollision({ x, y, id1: id, id2: adjacent })
      );
      collisionsMap.set(adjacent, id);
      collisionsMap.set(id, adjacent);
      return;
    }
  }

  checkForCollisions({ entityId, x, y, w, h, collisionsArray, collisionsMap }) {
    // top edge: x changes, y stays constant.
    for (let i = x; i < x + w; i++) {
      this.checkAdjacent({
        x: i,
        y: y - 1,
        id: entityId,
        collisionsArray,
        collisionsMap,
      });
    }
    // left edge: x remains constant, y changes.
    for (let j = y; j < y + h; j++) {
      this.checkAdjacent({
        x: x - 1,
        y: j,
        id: entityId,
        collisionsArray,
        collisionsMap,
      });
    }
    // bottom edge: x changes, y+h remains constant
    for (let i = x; i < x + w; i++) {
      this.checkAdjacent({
        x: i,
        y: y + h + 1,
        id: entityId,
        collisionsArray,
        collisionsMap,
      });
    }
    // right edge: x+w remains constant, y remains changes
    for (let j = y; j < y + h; j++) {
      this.checkAdjacent({
        x: x + w + 1,
        y: j,
        id: entityId,
        collisionsArray,
        collisionsMap,
      });
    }
  }

  update(entities) {
    const collisionsArray = [];
    const collisionsMap = new Map();
    for (let i = 0; i < entities.length; i++) {
      const currentEntity = entities[i];
      const entityLoc = componentManager.lookupComponent(
        LocationComponent.getComponentId(),
        currentEntity
      );

      const entityColl = componentManager.lookupComponent(
        BoxCollisionComponent.getComponentId(),
        currentEntity
      );

      const paddleColl = componentManager.lookupComponent(
        PaddleCollisionComponent.getComponentId(),
        currentEntity
      );

      if (entityLoc && entityColl) {
        this.checkForCollisions({
          entityId: currentEntity.id,
          collisionsArray,
          collisionsMap,
          x: entityLoc.x,
          y: entityLoc.y,
          w: entityColl.w,
          h: entityColl.h,
        });
      }

      if (entityLoc && paddleColl) {
        this.checkForCollisions({
          entityId: currentEntity.id,
          collisionsArray,
          collisionsMap,
          x: entityLoc.x,
          y: entityLoc.y,
          w: paddleColl.w,
          h: paddleColl.h,
        });
      }
    }

    return collisionsArray;
  }
}

const collisionDetectionSystem = new CollisionDetectionSystem();

export default collisionDetectionSystem;
