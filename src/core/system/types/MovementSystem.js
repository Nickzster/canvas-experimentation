import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  COMPONENT_TYPES,
  X,
  Y,
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
          velocity.vec.vec[X] = velocity.speed * -1; // TODO: mutation is not working because it is a copy, not a ref
          velocity.updateVec({ x: velocity.speed * -1 });
        }

        if (inputSystem.currentKey === keyboard.moveRight) {
          velocity.vec.vec[X] = velocity.speed * 1;
          velocity.updateVec({ x: velocity.speed * 1 });
        }

        if (inputSystem.currentKey === "NONE") {
          velocity.vec.vec[X] = 0;
          velocity.updateVec({ x: 0 });
        }

        const updatedX = location.x + 1 * velocity.vec.vec[X];

        if (updatedX >= 0 && updatedX + collision.w <= CANVAS_WIDTH) {
          location.x = updatedX;
        }
      } else if (velocity && location) {
        location.x = location.x + 1 * velocity.vec.vec[X];
        location.y = location.y + 1 * velocity.vec.vec[Y];
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
