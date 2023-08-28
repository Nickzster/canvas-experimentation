import { X, Y } from "../consts";

export default class Vec2 {
  x;
  y;

  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    return this;
  }

  reverseX() {
    this.x *= -1;
    return this;
  }

  reverseY() {
    this.y *= -1;
    return this;
  }

  reverse() {
    this.reverseX();
    this.reverseY();
  }
}
