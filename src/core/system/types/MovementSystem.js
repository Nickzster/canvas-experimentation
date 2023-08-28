import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  COMPONENT_TYPES,
  ctx,
} from "../../consts";

import componentManager from "../../component/ComponentManager";
import inputSystem from "./InputSystem";

class MovementSystem {
  constructor() {}

  // TODO: Clean up logic with all conditional statements.
  update(entities) {
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const model = componentManager.lookupComponent(
        COMPONENT_TYPES.BOX_MODEL_COMPONENT_TYPE,
        entity
      );
      const location = componentManager.lookupComponent(
        COMPONENT_TYPES.LOCATION_COMPONENT_TYPE,
        entity
      );
      const collision = componentManager.lookupComponent(
        COMPONENT_TYPES.BOX_COLLISION_COMPONENT_TYPE,
        entity
      );
      const velocity = componentManager.lookupComponent(
        COMPONENT_TYPES.VELOCITY_COMPONENT_TYPE,
        entity
      );

      const keyboard = componentManager.lookupComponent(
        COMPONENT_TYPES.KEYBOARD_INPUT_COMPONENT,
        entity
      );

      if (!model) return;

      ctx.save();

      if (keyboard && velocity) {
        if (inputSystem.currentKey === keyboard.moveLeft) {
          console.log("moving left");
          location.x = location.x + 1 * velocity.speed * -1;
        }
        if (inputSystem.currentKey === keyboard.moveRight) {
          console.log("moving right");
          location.x = location.x + 1 * velocity.speed * 1;
        }
      }

      if (velocity && location) {
        location.x = location.x + 1 * velocity.vec.x;
        location.y = location.y + 1 * velocity.vec.y;
      }

      ctx.fillStyle = model.color;

      if (location) {
        ctx.translate(location.x, location.y);
      } else {
        ctx.translate(0, 0);
      }

      ctx.fillRect(0, 0, model.w, model.h);

      if (collision) {
        if (location) {
          collision.updateLoc(location.x, location.y);
        } else {
          collision.updateLoc(0, 0);
        }
      }

      if (velocity && location) {
        if (location.x + model.w >= CANVAS_WIDTH) velocity.vec.reverseX();
        if (location.x <= 0) velocity.vec.reverseX();

        if (location.y + model.h >= CANVAS_HEIGHT) velocity.vec.reverseY();
        if (location.y <= 0) velocity.vec.reverseY();
      }

      ctx.restore();
    }
  }
}

const movementSystem = new MovementSystem();

export default movementSystem;
