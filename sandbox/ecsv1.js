const canvasWidth = 768;
const canvasHeight = 512;

let xDirection = 1;
let yDirection = 1;

let currentX = 0;
let currentY = 0;
let speed = 1;

const X = 0;
const Y = 1;

const canvas = document.getElementById("sandbox");
const ctx = canvas.getContext("2d");

// ENTITIES =========================================================

const MAX_ENTITIES = 10;

class EntityManager {
  maxEntities;

  entities;

  availableEntityIds;

  constructor(maxEntities) {
    this.maxEntities = maxEntities;
    this.entities = [];
    this.availableEntityIds = new Array(maxEntities)
      .fill(0)
      .map((_, idx) => idx); // generate an array of ints in ascending order.;
  }

  addEntity(entity) {
    if (this.entities.length >= this.maxEntities) {
      console.error("max entities exceeded!");
      return this;
    }

    entity.id = this.availableEntityIds.shift();
    this.entities.push(entity);
    return this;
  }

  removeEntity(id) {
    const currentLength = this.entities.length;
    this.entities = this.entities.filter((entity) => entity.id !== id);
    if (currentLength > this.entities.length) this.availableEntityIds.push(id);
    return this;
  }
}

const entityManager = new EntityManager(MAX_ENTITIES);

class Entity {
  id = -1;

  components = [];

  constructor(components = []) {
    this.components = components;
  }
}

// COMPONENTS =========================================================
const BOX_COLLISION_COMPONENT_TYPE = 0;
const BOX_MODEL_COMPONENT_TYPE = 1;

class ComponentManager {
  constructor() {}

  lookupComponent(type, entity) {
    // TODO: Refactor O(n) component lookup to O(1) via signatures.
    // TODO: Create a component manager to manage these components?
    return entity.components.find((component) => component.type === type);
  }
}

const componentManager = new ComponentManager();

class Component {
  type = -1;

  constructor(type) {
    this.type = type;
  }
}

class BoxCollisionComponent extends Component {
  x = 0;
  y = 0;

  h = 0;
  w = 0;

  w = 0;
  h = 0;

  constructor({ x, y, w, h }) {
    super(BOX_COLLISION_COMPONENT_TYPE);
    this.setAttributes(x, y, w, h);
    return this;
  }

  setAttributes(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  updateLoc(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}

class BoxModelComponent extends Component {
  color;
  speed;

  location; //x,y
  direction; //x,y

  w = 0;
  h = 0;

  id = -1;

  constructor({ color = "black", x = 0, y = 0, w = 0, h = 0, speed = 1 }) {
    super(BOX_MODEL_COMPONENT_TYPE);
    this.location = [0, 0];
    this.direction = [1, 1];
    this.setAttributes({ color, x, y, w, h, speed });
    return this;
  }

  setAttributes({ color, x = 0, y = 0, w = 0, h = 0, speed = 1 }) {
    this.color = color;
    this.location[X] = x;
    this.location[Y] = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    return this;
  }

  setId(newId) {
    this.id = newId;
    return this;
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
    return this;
  }

  setStartingLocation(x, y) {
    this.location[X] = x;
    this.location[Y] = y;

    return this;
  }

  setSize(w, h) {
    this.w = w;
    this.h = h;

    return this;
  }
}

// SYSTEMS =========================================================

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

const collisionSystem = (entities) => {
  // todo: improve O(n^2) alg
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
            BOX_MODEL_COMPONENT_TYPE,
            firstEntity
          ),
          componentManager.lookupComponent(
            BOX_MODEL_COMPONENT_TYPE,
            secondEntity
          ),
        ];

        const collisionModels = [
          componentManager.lookupComponent(
            BOX_COLLISION_COMPONENT_TYPE,
            firstEntity
          ),
          componentManager.lookupComponent(
            BOX_COLLISION_COMPONENT_TYPE,
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
};

const movementSystem = (boxEntity) => {
  // TODO: Refactor O(n) component lookup to O(1) via signatures.
  const model = componentManager.lookupComponent(
    BOX_MODEL_COMPONENT_TYPE,
    boxEntity
  );
  const collision = componentManager.lookupComponent(
    BOX_COLLISION_COMPONENT_TYPE,
    boxEntity
  );
  if (!model) return;
  ctx.save();
  model.location[X] = model.location[X] + 1 * model.speed * model.direction[X];
  model.location[Y] = model.location[Y] + 1 * model.speed * model.direction[Y];
  ctx.fillStyle = model.color;

  ctx.translate(model.location[X], model.location[Y]);

  ctx.fillRect(0, 0, model.w, model.h);

  if (collision) collision.updateLoc(model.location[X], model.location[Y]);

  if (model.location[X] + model.w >= canvasWidth) model.direction[X] = -1;
  if (model.location[X] <= 0) model.direction[X] = 1;

  if (model.location[Y] + model.h >= canvasHeight) model.direction[Y] = -1;
  if (model.location[Y] <= 0) model.direction[Y] = 1;

  ctx.restore();
};

// APP LOGIC =========================================================

entityManager
  .addEntity(
    new Entity([
      new BoxModelComponent({
        color: "blue",
        x: 0,
        y: 0,
        w: 50,
        h: 50,
        speed: 1,
      }),
      new BoxCollisionComponent({
        x: 0,
        y: 0,
        w: 50,
        h: 50,
      }),
    ])
  )
  .addEntity(
    new Entity([
      new BoxModelComponent({
        color: "red",
        x: 500,
        y: 20,
        h: 25,
        w: 25,
        speed: 1,
      }),
      new BoxCollisionComponent({
        x: 500,
        y: 20,
        h: 25,
        w: 25,
      }),
    ])
  );

function draw() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  const objects = entityManager.entities;

  for (let i = 0; i < objects.length; i++) {
    movementSystem(objects[i]);
  }

  collisionSystem(objects);

  window.requestAnimationFrame(draw);
}

draw();
