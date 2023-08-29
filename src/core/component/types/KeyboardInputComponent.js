import { COMPONENT_TYPES } from "../../consts";
import Component from "../Component";

class KeyboardInputComponent extends Component {
  moveUp;
  moveDown;
  moveLeft;
  moveRight;

  constructor({
    up = undefined,
    down = undefined,
    left = undefined,
    right = undefined,
  }) {
    super("KEYBOARD_INPUT_COMPONENT");
    this.moveUp = up;
    this.moveDown = down;
    this.moveLeft = left;
    this.moveRight = right;
  }
}

export default KeyboardInputComponent;
