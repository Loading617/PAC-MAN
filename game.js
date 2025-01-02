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

window.addEventListener("gamepadconnected", (event) => {
    console.log("Controller connected:", event.gamepad);
});

window.addEventListener("gamepaddisconnected", (event) => {
    console.log("Controller disconnected:", event.gamepad);
});

function handleGamepadInput() {
    const gamepads = navigator.getGamepads();
    if (!gamepads) return;

    const gamepad = gamepads[0]; // Assuming player 1 uses the first controller
    if (gamepad) {
        // Read joystick or D-pad inputs
        const horizontalAxis = gamepad.axes[0]; // X-axis (left-right)
        const verticalAxis = gamepad.axes[1];   // Y-axis (up-down)

        // Deadzone to avoid accidental movement
        const deadzone = 0.1;

        if (horizontalAxis < -deadzone) {
            console.log("Move Left");
            pacman.move("left");
        } else if (horizontalAxis > deadzone) {
            console.log("Move Right");
            pacman.move("right");
        }

        if (verticalAxis < -deadzone) {
            console.log("Move Up");
            pacman.move("up");
        } else if (verticalAxis > deadzone) {
            console.log("Move Down");
            pacman.move("down");
        }

        // Handle D-pad button presses for precise movement
        if (gamepad.buttons[12].pressed) pacman.move("up");    // D-pad Up
        if (gamepad.buttons[13].pressed) pacman.move("down");  // D-pad Down
        if (gamepad.buttons[14].pressed) pacman.move("left");  // D-pad Left
        if (gamepad.buttons[15].pressed) pacman.move("right"); // D-pad Right
    }
}

function gameLoop() {
    handleGamepadInput();  // Handle controller input
    updateGame();          // Update Pac-Man's position and game state
    renderGame();          // Draw Pac-Man, ghosts, and pellets
    requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowUp":
            pacman.move("up");
            break;
        case "ArrowDown":
            pacman.move("down");
            break;
        case "ArrowLeft":
            pacman.move("left");
            break;
        case "ArrowRight":
            pacman.move("right");
            break;
    }
});

navigator.getGamepads().forEach((pad, index) => {
    if (pad) {
        console.log(`Player ${index + 1}:`, pad.id);
    }
});

const pacman = {
    x: 5,
    y: 5,
    move: function (direction) {
        switch (direction) {
            case "up":
                this.y -= 1;
                break;
            case "down":
                this.y += 1;
                break;
            case "left":
                this.x -= 1;
                break;
            case "right":
                this.x += 1;
                break;
        }
        console.log(`Pac-Man moved to: (${this.x}, ${this.y})`);
        // Add collision detection and update game board here
    },
};

if (Math.abs(horizontalAxis) > deadzone || Math.abs(verticalAxis) > deadzone) {
    // Process movement
}

if (gamepad.buttons[9].pressed) { // Start button
    togglePause();
}

window.addEventListener("gamepadconnected", (event) => {
    console.log("Controller connected:", event.gamepad);
});

window.addEventListener("gamepaddisconnected", (event) => {
    console.log("Controller disconnected:", event.gamepad);
});

function handleGamepadInput() {
    const gamepads = navigator.getGamepads();
    if (!gamepads) return;

    const gamepad = gamepads[0]; // Assuming player 1 uses the first controller
    if (gamepad) {
        // Read joystick or D-pad inputs
        const horizontalAxis = gamepad.axes[0]; // X-axis (left-right)
        const verticalAxis = gamepad.axes[1];   // Y-axis (up-down)

        // Deadzone to avoid accidental movement
        const deadzone = 0.1;

        if (horizontalAxis < -deadzone) {
            console.log("Move Left");
            pacman.move("left");
        } else if (horizontalAxis > deadzone) {
            console.log("Move Right");
            pacman.move("right");
        }

        if (verticalAxis < -deadzone) {
            console.log("Move Up");
            pacman.move("up");
        } else if (verticalAxis > deadzone) {
            console.log("Move Down");
            pacman.move("down");
        }

        // Handle D-pad button presses for precise movement
        if (gamepad.buttons[12].pressed) pacman.move("up");    // D-pad Up
        if (gamepad.buttons[13].pressed) pacman.move("down");  // D-pad Down
        if (gamepad.buttons[14].pressed) pacman.move("left");  // D-pad Left
        if (gamepad.buttons[15].pressed) pacman.move("right"); // D-pad Right
    }
}

function gameLoop() {
    handleGamepadInput();  // Handle controller input
    updateGame();          // Update Pac-Man's position and game state
    renderGame();          // Draw Pac-Man, ghosts, and pellets
    requestAnimationFrame(gameLoop);
}

gameLoop();

document.addEventListener("keydown", (event) => {
    switch (event.code) {
        case "ArrowUp":
            pacman.move("up");
            break;
        case "ArrowDown":
            pacman.move("down");
            break;
        case "ArrowLeft":
            pacman.move("left");
            break;
        case "ArrowRight":
            pacman.move("right");
            break;
    }
});

navigator.getGamepads().forEach((pad, index) => {
    if (pad) {
        console.log(`Player ${index + 1}:`, pad.id);
    }
});

const pacman = {
    x: 5,
    y: 5,
    move: function (direction) {
        switch (direction) {
            case "up":
                this.y -= 1;
                break;
            case "down":
                this.y += 1;
                break;
            case "left":
                this.x -= 1;
                break;
            case "right":
                this.x += 1;
                break;
        }
        console.log(`Pac-Man moved to: (${this.x}, ${this.y})`);
        // Add collision detection and update game board here
    },
};

if (Math.abs(horizontalAxis) > deadzone || Math.abs(verticalAxis) > deadzone) {
    // Process movement
}

if (gamepad.buttons[9].pressed) { // Start button
    togglePause();
}
