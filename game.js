const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tileSize = 20;  // Define the size of each tile
const rows = 25;      // Number of rows
const cols = 25;      // Number of columns

// Define Pac-Man starting position
let pacMan = {
    x: 12,
    y: 12,
    direction: 'right', // initial direction
    size: tileSize
};

// Define the game grid (walls, dots, etc.)
let grid = Array.from({ length: rows }, () => Array(cols).fill('dot'));

// Initialize the game world
function drawWorld() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Loop through the grid to draw walls and dots
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === 'dot') {
                ctx.fillStyle = '#FFD700';  // Dot color
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }
}

// Draw Pac-Man
function drawPacMan() {
    ctx.beginPath();
    ctx.arc(pacMan.x * tileSize + tileSize / 2, pacMan.y * tileSize + tileSize / 2, tileSize / 2, 0.2 * Math.PI, 1.8 * Math.PI);  // Pac-Man's mouth
    ctx.lineTo(pacMan.x * tileSize + tileSize / 2, pacMan.y * tileSize + tileSize / 2);
    ctx.closePath();
    ctx.fillStyle = '#FFFF00';
    ctx.fill();
}

// Handle user input (arrow keys)
function movePacMan() {
    if (pacMan.direction === 'right') pacMan.x++;
    if (pacMan.direction === 'left') pacMan.x--;
    if (pacMan.direction === 'up') pacMan.y--;
    if (pacMan.direction === 'down') pacMan.y++;

    // Check bounds
    if (pacMan.x >= cols) pacMan.x = 0;
    if (pacMan.x < 0) pacMan.x = cols - 1;
    if (pacMan.y >= rows) pacMan.y = 0;
    if (pacMan.y < 0) pacMan.y = rows - 1;
}

// Handle key press events
window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight') pacMan.direction = 'right';
    if (event.key === 'ArrowLeft') pacMan.direction = 'left';
    if (event.key === 'ArrowUp') pacMan.direction = 'up';
    if (event.key === 'ArrowDown') pacMan.direction = 'down';
});

// Main game loop
function gameLoop() {
    movePacMan();
    drawWorld();
    drawPacMan();
    requestAnimationFrame(gameLoop);  // Calls the gameLoop function again to keep it running
}

// Start the game
gameLoop();

let score = 0;

// Check if Pac-Man eats a dot
function checkDotCollision() {
    if (grid[pacMan.y][pacMan.x] === 'dot') {
        grid[pacMan.y][pacMan.x] = 'eaten';
        score++;
    }
}
