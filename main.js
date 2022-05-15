let won = false;

const team = document.getElementById("team");

const position = document.getElementById("position");

team.value = JSON.parse(localStorage.getItem("teamColor")) || "red";

const track = document.getElementById("track");
track.width = 200;
const ctx = track.getContext("2d");

const network = document.getElementById("network");
network.width = 400;
const networkCtx = network.getContext("2d");

const road = new Road(track.width * 0.5, track.width * 0.9);

const N = 250;

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
  new Car({ x: road.getLaneCenter(1), y: -100, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(0), y: -300, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(2), y: -320, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(0), y: -500, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(1), y: -510, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(1), y: -700, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(2), y: -720, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(0), y: -850, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(2), y: -1050, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(1), y: -1060, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(0), y: -1200, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(2), y: -1210, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(2), y: -1300, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(1), y: -1420, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(2), y: -1400, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(0), y: -1550, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(1), y: -1650, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(0), y: -1750, color: getRandomColor() }),
  new Car({ x: road.getLaneCenter(2), y: -1800, color: getRandomColor() }),
];

updateCarsColor(team.value);
animate();

function updateCarsColor(color) {
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

  const currentPosition = traffic.filter((c) => bestCar.y - c.y - 1 < 0).length;
  position.innerText = `P${1 + traffic.length - currentPosition}`;

  lastCarDistance = traffic[traffic.length - 1].y;
  if (!won && bestCar.y - lastCarDistance + 2 < 0) {
    alert("💬 GOOD JOB. YOU'RE P1. DON'T CRASH NOW. 🍾");
    won = true;
  }

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
  ctx.globalAlpha = 0.015;
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
