import Component from "../Component";
import componentManager from "../ComponentManager";

const COMPONENT_TAG = "LOCATION_COMPONENT";
export default class LocationComponent extends Component {
  x;
  y;

  static getComponentId() {
    return componentManager.lookupId(COMPONENT_TAG);
  }

  constructor({ x, y }) {
    super(COMPONENT_TAG);
    this.x = x;
    this.y = y;
    this.setAttributes({ x, y });
  }

  setAttributes({ x, y }) {
    this.x = x;
    this.y = y;
  }
}
