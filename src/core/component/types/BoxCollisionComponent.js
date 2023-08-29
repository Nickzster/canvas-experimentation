import { COMPONENT_TYPES } from "../../consts";
import Component from "../Component";

export default class BoxCollisionComponent extends Component {
  x = 0; // TODO: Defer to location component.
  y = 0;

  h = 0;
  w = 0;

  constructor({ w, h }) {
    super("BOX_COLLISION_COMPONENT");
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
