import { COMPONENT_TYPES } from "../../consts";
import Component from "../Component";

export default class BoxCollisionComponent extends Component {
  x = 0;
  y = 0;

  h = 0;
  w = 0;

  w = 0;
  h = 0;

  constructor({ x, y, w, h }) {
    super(COMPONENT_TYPES.BOX_COLLISION_COMPONENT_TYPE);
    this.setAttributes(x, y, w, h);
    return this;
  }

  setAttributes(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  updateLoc(newX, newY) {
    this.x = newX;
    this.y = newY;
  }
}
