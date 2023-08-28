import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  COMPONENT_TYPES,
  X,
  Y,
  ctx,
} from "../../consts";

import componentManager from "../../component/ComponentManager";

class MovementSystem {
  constructor() {}

  update(entities) {
    for (let i = 0; i < entities.length; i++) {
      const boxEntity = entities[i];
      const model = componentManager.lookupComponent(
        COMPONENT_TYPES.BOX_MODEL_COMPONENT_TYPE,
        boxEntity
      );
      const collision = componentManager.lookupComponent(
        COMPONENT_TYPES.BOX_COLLISION_COMPONENT_TYPE,
        boxEntity
      );
      if (!model) return;
      ctx.save();
      model.location[X] =
        model.location[X] + 1 * model.speed * model.direction[X];
      model.location[Y] =
        model.location[Y] + 1 * model.speed * model.direction[Y];
      ctx.fillStyle = model.color;

      ctx.translate(model.location[X], model.location[Y]);

      ctx.fillRect(0, 0, model.w, model.h);

      if (collision) collision.updateLoc(model.location[X], model.location[Y]);

      if (model.location[X] + model.w >= CANVAS_WIDTH) model.direction[X] = -1;
      if (model.location[X] <= 0) model.direction[X] = 1;

      if (model.location[Y] + model.h >= CANVAS_HEIGHT) model.direction[Y] = -1;
      if (model.location[Y] <= 0) model.direction[Y] = 1;

      ctx.restore();
    }
  }
}

const movementSystem = new MovementSystem();

export default movementSystem;
