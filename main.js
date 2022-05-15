const canvas = document.getElementById("track");
canvas.width = 200;

const ctx = canvas.getContext("2d");
const road = new Road(canvas.width * 0.5, canvas.width * 0.9);
const car = new Car({
  x: road.getLaneCenter(1),
  y: 100,
  // controllable: true,
  ai: true,
  maxSpeed: 5,
  // color: "red", // Ferrari
  // color: "blue", // Williams
  // color: "darkorange", // McLaren
  // color: "darkgreen", // Lotus
  // color: "darkblue", // Red Bull
  // color: "grey", // Mercedes
  // color: "darkslategray", // Cooper
  // color: "green", // Brabham
  // color: "gold", // Renault
  color: "red",
});
const traffic = [
  new Car({ x: road.getLaneCenter(1), y: -100, color: "orange" }),
];
car.draw(ctx);

animate();

function animate() {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  car.update(road.borders, traffic);
  canvas.height = window.innerHeight;
  ctx.save();
  ctx.translate(0, -car.y + canvas.height * 0.7);
  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx);
  }
  car.draw(ctx);
  ctx.restore();
  requestAnimationFrame(animate);
}

const team = document.getElementById("team");

team.addEventListener("change", (e) => {
  car.color = e.target.value;
  car.updateColor();
  e.target.blur();
});
