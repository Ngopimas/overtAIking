class Road {
  constructor(x, width, laneCount = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width * 0.5;
    this.right = x + width * 0.5;

    const infinity = 1000000;
    this.top = -infinity;
    this.bottom = infinity;

    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomLeft = { x: this.left, y: this.bottom };
    const bottomRight = { x: this.right, y: this.bottom };
    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
  }

  #drawRoad(x) {
    ctx.beginPath();
    ctx.moveTo(x, this.top);
    ctx.lineTo(x, this.bottom);
    ctx.stroke();
  }

  getLaneCenter(laneIndex) {
    const laneWidth = this.width / this.laneCount;
    return (
      this.left +
      laneWidth * 0.5 +
      Math.min(laneIndex, this.laneCount - 1) * laneWidth
    );
  }

  draw(ctx) {
    ctx.lineWidth = 5;

    for (let i = 1; i < this.laneCount; i++) {
      const x = lerp(this.left, this.right, i / this.laneCount);
      ctx.strokeStyle = "lightslategray";
      ctx.setLineDash([0.1, 0.2]);
      this.#drawRoad(x);
    }
    ctx.setLineDash([]);
    this.borders.forEach((borders) => {
      ctx.strokeStyle = "floralwhite";
      ctx.beginPath();
      ctx.moveTo(borders[0].x, borders[0].y);
      ctx.lineTo(borders[1].x, borders[1].y);
      ctx.stroke();
      ctx.setLineDash([20, 22]);
      ctx.strokeStyle = "red";
      ctx.beginPath();
      ctx.moveTo(borders[0].x, borders[0].y);
      ctx.lineTo(borders[1].x, borders[1].y);
      ctx.stroke();
      ctx.setLineDash([]);
    });
  }
}
