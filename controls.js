class Controls {
  constructor() {
    // this.keys = {};
    // this.keydown = this.keydown.bind(this);
    // this.keyup = this.keyup.bind(this);
    // window.addEventListener("keydown", this.keydown);
    // window.addEventListener("keyup", this.keyup);
    this.forward = false;
    this.left = false;
    this.right = false;
    this.backward = false;

    this.#addKeyboardListeners();
  }
  keydown(event) {
    this.keys[event.key] = true;
  }
  keyup(event) {
    this.keys[event.key] = false;
  }
  #addKeyboardListeners() {
    document.onkeydown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.left = true;
          break;
        case "ArrowRight":
          this.right = true;
          break;
        case "ArrowUp":
          this.forward = true;
          break;
        case "ArrowDown":
          this.backward = true;
          break;
        case "a":
          this.left = true;
          break;
        case "d":
          this.right = true;
          break;
        case "w":
          this.forward = true;
          break;
        case "s":
          this.backward = true;
          break;
        default:
          break;
      }
      //   console.table(this);
    };

    document.onkeyup = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          this.left = false;
          break;
        case "ArrowRight":
          this.right = false;
          break;
        case "ArrowUp":
          this.forward = false;
          break;
        case "ArrowDown":
          this.backward = false;
          break;
        case "a":
          this.left = false;
          break;
        case "d":
          this.right = false;
          break;
        case "w":
          this.forward = false;
          break;
        case "s":
          this.backward = false;
          break;
        default:
          break;
      }
      //   console.table(this);
    };
  }
}
