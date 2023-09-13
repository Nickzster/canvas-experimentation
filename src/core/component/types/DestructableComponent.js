import Component from "../Component";
import componentManager from "../ComponentManager";

const COMPONENT_TAG = "DESTRUCTABLE_COMPONENT";

export default class DestructableComponent extends Component {
  static getComponentId() {
    return componentManager.lookupId(COMPONENT_TAG);
  }

  constructor() {
    super(COMPONENT_TAG);
  }
}
