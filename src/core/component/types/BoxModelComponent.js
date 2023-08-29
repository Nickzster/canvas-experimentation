import Component from "../Component";
import componentManager from "../ComponentManager";

const COMPONENT_TAG = "BOX_MODEL_COMPONENT";
export default class BoxModelComponent extends Component {
  id = -1;
  color;

  w = 0;
  h = 0;

  static getComponentId() {
    return componentManager.lookupId(COMPONENT_TAG);
  }

  constructor({ color = "black", w = 0, h = 0 }) {
    super(COMPONENT_TAG);
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
