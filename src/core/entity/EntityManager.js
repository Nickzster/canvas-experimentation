import { MAX_ENTITIES } from "../consts";

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

  findEntityById(id) {
    return this.entities.find((entity) => entity.id === id);
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

export default entityManager;
