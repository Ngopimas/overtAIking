const canvas = document.getElementById("canvas");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width * 0.5, canvas.width * 0.9);
const car = new Car(road.getLaneCenter(1), 100, 30, 50);
car.draw(ctx);

animate();

function animate() {
  // ctx.clearRect(0, 0, canvas.width, canvas.height);
  car.update(road.borders);
  canvas.height = window.innerHeight;
  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7);
  road.draw(ctx);
  car.draw(ctx);
  ctx.restore();
  requestAnimationFrame(animate);
}
