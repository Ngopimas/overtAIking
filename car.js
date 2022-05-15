class Car {
  constructor({
    x,
    y,
    width = 30,
    height = 50,
    controllable = false,
    maxSpeed = 2,
    color = "white",
    ai = false,
  }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = maxSpeed;
    this.friction = 0.05;
    this.angle = 0;
    this.isCrashed = false;
    this.controls = new Controls(controllable);
    this.useBrain = ai && !controllable;

    if (controllable || ai) {
      this.sensor = new Sensor(this);
      this.brain = new NeuralNetwork([this.sensor.rayCount, 6, 4]);
    }

    this.img = new Image();
    this.img.src = "./car.png";

    this.mask = document.createElement("canvas");
    this.mask.width = this.width;
    this.mask.height = this.height;

    this.maskCtx = this.mask.getContext("2d");
    this.img.onload = () => {
      this.updateColor();
    };
  }

  updateColor() {
    this.maskCtx.clearRect(0, 0, this.width, this.height);
    this.maskCtx.fillStyle = this.color;
    this.maskCtx.rect(0, 0, this.width, this.height);
    this.maskCtx.fill();
    this.maskCtx.globalCompositeOperation = "destination-atop";
    this.maskCtx.drawImage(this.img, 0, 0, this.width, this.height);
  }

  update(roadBorders, traffic) {
    if (!this.isCrashed) {
      this.#move();
      this.polygon = this.#createPolygon();
      this.isCrashed = this.#assessCrash(roadBorders, traffic);
    }

    if (this.sensor) {
      this.sensor.update(roadBorders, traffic);
      const offsets = this.sensor.readings.map((sensor) => {
        return !sensor ? 0 : 1 - sensor.offset;
      });
      const outputs = NeuralNetwork.feedForward(offsets, this.brain);

      if (this.useBrain) {
        this.controls.forward = outputs[0];
        this.controls.backward = outputs[3];
        this.controls.left = outputs[1];
        this.controls.right = outputs[2];
      }
    }
  }

  #assessCrash(roadBorders, traffic) {
    for (let i = 0; i < roadBorders.length; i++) {
      if (doesPolysIntersect(this.polygon, roadBorders[i])) {
        return true;
      }
    }
    for (let i = 0; i < traffic.length; i++) {
      if (doesPolysIntersect(this.polygon, traffic[i].polygon)) {
        return true;
      }
    }
    return false;
  }

  #createPolygon() {
    const points = [];
    const rad = Math.hypot(this.width, this.height) * 0.5;
    const alpha = Math.atan2(this.width, this.height);
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    });
    return points;
  }

  #move() {
    if (this.controls.forward) {
      this.speed += this.acceleration;
    }
    if (this.controls.backward) {
      this.speed -= this.acceleration;
    }
    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }
    if (this.speed < -this.maxSpeed * 0.5) {
      this.speed = -this.maxSpeed * 0.5;
    }
    if (this.speed > 0) {
      this.speed -= this.friction;
    }
    if (this.speed < 0) {
      this.speed += this.friction;
    }
    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed != 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }

      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }
    }

    this.x -= this.speed * Math.sin(this.angle);
    this.y -= this.speed * Math.cos(this.angle);
  }

  draw(ctx) {
    if (this.sensor) {
      this.sensor.draw(ctx);
    }

    // if (this.polygon) {
    //   if (this.isCrashed) {
    //     ctx.fillStyle = "red";
    //   } else {
    //     ctx.fillStyle = this.color;
    //   }
    //   ctx.beginPath();
    //   ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    //   for (let i = 1; i < this.polygon.length; i++) {
    //     ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    //   }
    //   ctx.fill();
    // }

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(-this.angle);
    // ctx.beginPath();
    // ctx.rect(-this.width * 0.5, -this.height * 0.5, this.width, this.height);
    // ctx.fill();
    if (!this.isCrashed) {
      ctx.drawImage(
        this.mask,
        -this.width * 0.5,
        -this.height * 0.5,
        this.width,
        this.height
      );
      ctx.globalCompositeOperation = "multiply";
    }
    ctx.drawImage(
      this.img,
      -this.width * 0.5,
      -this.height * 0.5,
      this.width,
      this.height
    );
    ctx.restore();
  }
}
