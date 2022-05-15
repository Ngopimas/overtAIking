const track = document.getElementById("track");
track.width = 200;
const ctx = track.getContext("2d");

const network = document.getElementById("network");
network.width = 400;
const networkCtx = network.getContext("2d");

const road = new Road(track.width * 0.5, track.width * 0.9);
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
  const networkWidth = window.innerWidth - track.width - window.innerWidth;

  const networkMaxWidth = Math.max(networkWidth, 400);
  network.width = track.height = window.innerHeight;
  network.height = window.innerHeight;
  ctx.save();
  ctx.translate(0, -car.y + track.height * 0.7);
  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx);
  }
  car.draw(ctx);
  ctx.restore();

  Visualizer.drawNetwork(networkCtx, car.brain);

  requestAnimationFrame(animate);
}

const team = document.getElementById("team");

team.addEventListener("change", (e) => {
  car.color = e.target.value;
  car.updateColor();
  e.target.blur();
});
