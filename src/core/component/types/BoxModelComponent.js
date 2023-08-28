import { COMPONENT_TYPES } from "../../consts";
import Component from "../Component";

import { X, Y } from "../../consts";

export default class BoxModelComponent extends Component {
  color;
  speed;

  location; //x,y
  direction; //x,y

  w = 0;
  h = 0;

  id = -1;

  constructor({ color = "black", x = 0, y = 0, w = 0, h = 0, speed = 1 }) {
    super(COMPONENT_TYPES.BOX_MODEL_COMPONENT_TYPE);
    this.location = [0, 0];
    this.direction = [1, 1];
    this.setAttributes({ color, x, y, w, h, speed });
    return this;
  }

  setAttributes({ color, x = 0, y = 0, w = 0, h = 0, speed = 1 }) {
    this.color = color;
    this.location[X] = x;
    this.location[Y] = y;
    this.w = w;
    this.h = h;
    this.speed = speed;
    return this;
  }

  setId(newId) {
    this.id = newId;
    return this;
  }

  setSpeed(newSpeed) {
    this.speed = newSpeed;
    return this;
  }

  setStartingLocation(x, y) {
    this.location[X] = x;
    this.location[Y] = y;

    return this;
  }

  setSize(w, h) {
    this.w = w;
    this.h = h;

    return this;
  }
}
