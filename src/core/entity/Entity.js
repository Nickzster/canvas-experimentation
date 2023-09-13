export default class Entity {
  id = -1;

  components = [];

  constructor(components = []) {
    this.components = components;
  }
}
