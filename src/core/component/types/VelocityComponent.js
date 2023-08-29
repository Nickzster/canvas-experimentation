import Component from "../Component";
import { COMPONENT_TYPES } from "../../consts";
import Vec2 from "../../primitives/Vec2";

export default class VelocityComponent extends Component {
  vec;
  speed;

  constructor({ x, y, speed = 0 }) {
    super("VELOCITY_COMPONENT");
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
