import { X, Y } from "../consts";

export default class Vec2 {
  constructor({ x, y }) {
    this.vec = [x, y];

    return this;
  }

  update({ x, y }) {
    if (x) this.vec[X] = x;
    if (y) this.vec[Y] = y;
  }

  reverseX() {
    this.vec[X] *= -1;
    return this;
  }

  reverseY() {
    this.vec[Y] *= -1;
    return this;
  }

  reverse() {
    this.reverseX();
    this.reverseY();
  }
}
