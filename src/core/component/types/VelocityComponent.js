import Component from "../Component";
import { COMPONENT_TYPES } from "../../consts";
import Vec2 from "../../primitives/Vec2";

export default class VelocityComponent extends Component {
  vec;
  speed;

  constructor({ x, y, speed = 0 }) {
    super(COMPONENT_TYPES.VELOCITY_COMPONENT_TYPE);
    this.speed = speed;
    this.vec = new Vec2({ x: x * speed, y: y * speed });
  }

  update() {
    this.vec.reverse();
  }
}
