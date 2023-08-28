class ComponentManager {
  constructor() {}

  lookupComponent(type, entity) {
    // TODO: Refactor O(n) component lookup to O(1) via signatures.
    // TODO: Create a component manager to manage these components?
    return entity.components.find((component) => component.type === type);
  }
}

const componentManager = new ComponentManager();

export default componentManager;
