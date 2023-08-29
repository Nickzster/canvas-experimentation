import Component from "../Component";
import componentManager from "../ComponentManager";

const COMPONENT_TAG = "BOX_COLLISION_COMPONENT";

export default class BoxCollisionComponent extends Component {
  x = 0; // TODO: Defer to location component.
  y = 0;

  h = 0;
  w = 0;

  static getComponentId() {
    return componentManager.lookupId(COMPONENT_TAG);
  }

  constructor({ w, h }) {
    super(COMPONENT_TAG);
    this.setAttributes(w, h);
    return this;
  }

  setAttributes(w, h) {
    this.w = w;
    this.h = h;
  }

  updateLoc(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}
