const team = document.getElementById("team");

team.value = JSON.parse(localStorage.getItem("teamColor")) || "red";

const track = document.getElementById("track");
track.width = 200;
const ctx = track.getContext("2d");

const network = document.getElementById("network");
network.width = 400;
const networkCtx = network.getContext("2d");

const road = new Road(track.width * 0.5, track.width * 0.9);

const N = 500;

const cars = generateCars(N);
let bestCar = cars[0];
if (localStorage.getItem("bestCar")) {
  for (let i = 0; i < cars.length; i++) {
    cars[i].brain = JSON.parse(localStorage.getItem("bestCar"));
    if (i != 0) {
      NeuralNetwork.mutate(cars[i].brain, 0.15);
    }
  }
}

const traffic = [
  new Car({ x: road.getLaneCenter(1), y: -100, color: "orange" }),
];

updateCarsColor(team.value);
animate();

function updateCarsColor(color) {
  console.log(color);
  for (let i = 0; i < cars.length; i++) {
    cars[i].color = color;
    cars[i].updateColor();
  }
}

function save() {
  localStorage.setItem("bestCar", JSON.stringify(bestCar.brain));
}

function discard() {
  localStorage.removeItem("bestCar");
}

function generateCars(N) {
  const cars = [];
  for (let i = 1; i <= N; i++) {
    cars.push(
      new Car({
        x: road.getLaneCenter(1),
        y: 100,
        // controllable: true,
        ai: true,
        maxSpeed: 5,
        color: "red",
      })
    );
  }
  return cars;
}

function animate(time) {
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].update(road.borders, []);
  }
  for (let i = 0; i < cars.length; i++) {
    cars[i].update(road.borders, traffic);
  }
  bestCar = cars.find((c) => c.y == Math.min(...cars.map((c) => c.y)));

  const networkWidth =
    window.innerWidth - track.width - window.innerWidth * 0.2;

  const networkMaxWidth = Math.min(networkWidth, 750);
  network.width = networkMaxWidth;
  track.height = window.innerHeight;
  network.height = window.innerHeight;
  ctx.save();
  ctx.translate(0, -bestCar.y + track.height * 0.7);
  road.draw(ctx);
  for (let i = 0; i < traffic.length; i++) {
    traffic[i].draw(ctx);
  }
  ctx.globalAlpha = 0.01;
  for (let i = 0; i < cars.length; i++) {
    cars[i].draw(ctx);
  }
  ctx.globalAlpha = 1;
  bestCar.draw(ctx, true);
  ctx.restore();

  networkCtx.lineDashOffset = -time * 0.015;
  Visualizer.drawNetwork(networkCtx, bestCar.brain);

  requestAnimationFrame(animate);
}

team.addEventListener("change", (e) => {
  const color = e.target.value;
  localStorage.setItem("teamColor", JSON.stringify(color));
  updateCarsColor(color);
  e.target.blur();
});
