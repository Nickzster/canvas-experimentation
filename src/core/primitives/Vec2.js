export default class Vec2 {
  x;
  y;

  constructor({ x, y }) {
    this.x = x;
    this.y = y;
    return this;
  }

  update({ x, y }) {
    if (x) this.x = x;
    if (y) this.y = y;
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
