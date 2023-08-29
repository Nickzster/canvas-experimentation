import Component from "../../core/component/Component";
import componentManager from "../../core/component/ComponentManager";

const COMPONENT_TAG = "PADDLE_COLLISION_COMPONENT";
export default class PaddleCollisionComponent extends Component {
  x = 0; // TODO: Move to location component.
  y = 0;

  h = 0;
  w = 0;

  static getComponentId() {
    return componentManager.lookupId(COMPONENT_TAG);
  }
  constructor({ w, h }) {
    super(COMPONENT_TAG);
    this.setAttributes(w, h);
    this.cutPoints = [0, w / 2, w];
  }

  setAttributes(w, h) {
    this.w = w;
    this.h = h;
    return this;
  }

  updateLoc(newX, newY) {
    this.x = newX;
    this.y = newY;
    this.cutPoints = [newX, newX + this.w / 2, newX + this.w];
    return this;
  }
}
