import { COMPONENT_TYPES } from "../../consts";
import Component from "../Component";

export default class BoxModelComponent extends Component {
  id = -1;
  color;

  w = 0;
  h = 0;

  constructor({ color = "black", w = 0, h = 0 }) {
    super("BOX_MODEL_COMPONENT");
    this.setAttributes({ color, w, h });
    return this;
  }

  setAttributes({ color, w = 0, h = 0 }) {
    this.color = color;

    this.w = w;
    this.h = h;
    return this;
  }

  setId(newId) {
    this.id = newId;
    return this;
  }

  setSize(w, h) {
    this.w = w;
    this.h = h;

    return this;
  }
}
