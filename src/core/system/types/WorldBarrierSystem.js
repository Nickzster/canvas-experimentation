import componentManager from "../../component/ComponentManager";
import BoxCollisionComponent from "../../component/types/BoxCollisionComponent";
import BoxModelComponent from "../../component/types/BoxModelComponent";
import LocationComponent from "../../component/types/LocationComponent";
import VelocityComponent from "../../component/types/VelocityComponent";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../consts";

class WorldBarrierSystem {
  constructor() {}

  update(entities) {
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];

      const location = componentManager.lookupComponent(
        LocationComponent.getComponentId(),
        entity
      );

      const velocity = componentManager.lookupComponent(
        VelocityComponent.getComponentId(),
        entity
      );

      const model = componentManager.lookupComponent(
        BoxModelComponent.getComponentId(),
        entity
      );

      if (velocity && location && model) {
        if (location.x <= 0 || location.x + model.w >= CANVAS_WIDTH) {
          velocity.vec.reverseX();
        }

        if (location.y <= 0 || location.y + model.h >= CANVAS_HEIGHT) {
          velocity.vec.reverseY();
        }
      }
    }
  }
}

const worldBarrierSystem = new WorldBarrierSystem();

export default worldBarrierSystem;
