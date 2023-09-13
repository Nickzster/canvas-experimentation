import Component from "../Component";
import componentManager from "../ComponentManager";

const COMPONENT_TAG = "KEYBOARD_INPUT_COMPONENT";
class KeyboardInputComponent extends Component {
  moveUp;
  moveDown;
  moveLeft;
  moveRight;

  static getComponentId() {
    return componentManager.lookupId(COMPONENT_TAG);
  }

  constructor({
    up = undefined,
    down = undefined,
    left = undefined,
    right = undefined,
  }) {
    super(COMPONENT_TAG);
    this.moveUp = up;
    this.moveDown = down;
    this.moveLeft = left;
    this.moveRight = right;
  }
}

export default KeyboardInputComponent;
