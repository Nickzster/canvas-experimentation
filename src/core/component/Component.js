import componentManager from "./ComponentManager";

export default class Component {
  constructor(tag) {
    this.type = componentManager.register(tag);
    return this;
  }
}
