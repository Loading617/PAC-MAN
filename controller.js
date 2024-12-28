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
