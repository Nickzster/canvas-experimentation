import componentManager from "./ComponentManager";

export default class Component {
  tag = "BASE_COMPONENT";
  id = -1;

  constructor(tag) {
    this.tag = tag;
    this.id = componentManager.register(tag);
  }
}
