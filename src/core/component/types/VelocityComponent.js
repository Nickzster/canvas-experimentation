import Component from "../Component";
import Vec2 from "../../primitives/Vec2";
import componentManager from "../ComponentManager";

const COMPONENT_TAG = "VELOCITY_COMPONENT";

export default class VelocityComponent extends Component {
  vec;
  speed;

  static getComponentId() {
    return componentManager.lookupId(COMPONENT_TAG);
  }

  constructor({ x, y, speed = 0 }) {
    super(COMPONENT_TAG);
    this.speed = speed;
    this.vec = new Vec2({ x: x * speed, y: y * speed });
  }

  updateVec({ x, y }) {
    this.vec.update({ x, y });
    return this;
  }

  update() {
    this.vec.reverse();
  }
}
