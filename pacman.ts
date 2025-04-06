const canvas = document.getElementById("game") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

const TILE_SIZE = 16;
const ROWS = 31;
const COLS = 28;

const map: number[][] = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,1,2,1,2,1],
];

let pacman = { x: 14, y: 23, dx: 0, dy: 0 };

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft": pacman.dx = -1; pacman.dy = 0; break;
    case "ArrowRight": pacman.dx = 1; pacman.dy = 0; break;
    case "ArrowUp": pacman.dy = -1; pacman.dx = 0; break;
    case "ArrowDown": pacman.dy = 1; pacman.dx = 0; break;
  }
});

function drawMap() {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      const tile = map[row][col];
      if (tile === 1) {
        ctx.fillStyle = "blue";
        ctx.fillRect(col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      } else if (tile === 2) {
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(col * TILE_SIZE + TILE_SIZE / 2, row * TILE_SIZE + TILE_SIZE / 2, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
}

function drawPacMan() {
  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(
    pacman.x * TILE_SIZE + TILE_SIZE / 2,
    pacman.y * TILE_SIZE + TILE_SIZE / 2,
    TILE_SIZE / 2 - 2,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

function update() {
  const nextX = pacman.x + pacman.dx;
  const nextY = pacman.y + pacman.dy;

  if (map[nextY]?.[nextX] !== 1) {
    pacman.x = nextX;
    pacman.y = nextY;

    if (map[pacman.y][pacman.x] === 2) {
      map[pacman.y][pacman.x] = 0;
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawMap();
  update();
  drawPacMan();
  requestAnimationFrame(gameLoop);
}

gameLoop();
