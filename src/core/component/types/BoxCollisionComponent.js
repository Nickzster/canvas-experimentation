import { COMPONENT_TYPES } from "../../consts";
import Component from "../Component";

export default class BoxCollisionComponent extends Component {
  x = 0;
  y = 0;

  h = 0;
  w = 0;

  constructor({ w, h }) {
    super(COMPONENT_TYPES.BOX_COLLISION_COMPONENT_TYPE);
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
