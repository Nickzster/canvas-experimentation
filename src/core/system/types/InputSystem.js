class InputSystem {
  currentKey = "NONE";

  constructor() {
    document.addEventListener("keydown", (e) => {
      if (e.key === this.currentKey) return;
      this.currentKey = e.code;
    });

    document.addEventListener("keyup", (e) => {
      if (this.currentKey === e.code) this.currentKey = "NONE";
    });
  }
}

const inputSystem = new InputSystem();

export default inputSystem;
