import PaddleCollisionComponent from "../../../extensions/component/PaddleCollisionComponent";
import componentManager from "../../component/ComponentManager";
import BoxCollisionComponent from "../../component/types/BoxCollisionComponent";
import LocationComponent from "../../component/types/LocationComponent";
import { CANVAS_HEIGHT, CANVAS_WIDTH, COLLISION_TYPES } from "../../consts";

class WorldSystem {
  constructor() {
    this.width = CANVAS_WIDTH + 1;
    this.height = CANVAS_HEIGHT + 1;

    //    this.world = new Array(this.width).fill(new Array(this.height).fill(-1));

    // fill had a hard time initializing the array with all -1
    // therefore we are doing it manually and initializing with undefined.
    this.world = new Array(this.width);
    for (let i = 0; i < this.width; i++) {
      const yCol = new Array(this.height);
      for (let j = 0; j < this.height; j++) {
        yCol[j] = undefined;
      }
      this.world[i] = yCol;
    }
  }

  updateCoords({ id, x, y, w, h }) {
    for (let i = x; i < x + w; i++) {
      for (let j = y; j < y + h; j++) {
        if (i < 0 || i >= this.width) continue;
        if (j < 0 || j >= this.height) continue;

        this.world[i][j] = id;
      }
    }
  }

  update(entities) {
    // update world coords
    this.reset();
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
        this.updateCoords({
          id: currentEntity.id,
          x: entityLoc.x,
          y: entityLoc.y,
          w: entityColl.w,
          h: entityColl.h,
        });
      }

      if (entityLoc && paddleColl) {
        this.updateCoords({
          id: currentEntity.id,
          x: entityLoc.x,
          y: entityLoc.y,
          w: paddleColl.w,
          h: paddleColl.h,
        });
      }
    }
  }

  reset() {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.world[x][y] = undefined;
      }
    }
  }
}

const worldSystem = new WorldSystem();

export default worldSystem;
