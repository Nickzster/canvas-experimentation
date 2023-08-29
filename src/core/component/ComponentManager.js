class ComponentManager {
  MAX_COMPONENTS = 100;

  constructor() {
    this.comp_ids = new Array(this.MAX_COMPONENTS).fill(0).map((_, idx) => idx);
    this.comp_tags = new Map();
  }

  lookupComponent(type, entity) {
    // TODO: Refactor O(n) component lookup to O(1) via signatures.
    // TODO: Create a component manager to manage these components?
    return entity.components.find((component) => component.type === type);
  }

  register(tag) {
    let id = this.comp_tags.get(tag);
    if (id === undefined) {
      id = this.comp_ids.shift();
      this.comp_tags.set(tag, id);
    }

    return id;
  }
}

const componentManager = new ComponentManager();

export default componentManager;
