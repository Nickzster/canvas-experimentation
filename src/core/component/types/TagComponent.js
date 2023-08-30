import Component from "../Component";
import componentManager from "../ComponentManager";

const COMPONENT_TAG = "TAG_COMPONENT";

export default class TagComponent extends Component {
  static getComponentId() {
    return componentManager.lookupId(COMPONENT_TAG);
  }

  constructor(tag) {
    super(COMPONENT_TAG);
    this.tag = tag;

    return this;
  }
}
