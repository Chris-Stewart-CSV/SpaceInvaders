// main.js
document.addEventListener("DOMContentLoaded", () => {
    const world = new World();

    // Create a start button to initialize the game
    const startButton = document.createElement("button");
    startButton.innerText = "Start Game";
    startButton.style.position = "absolute";
    startButton.style.left = "50%";
    startButton.style.top = "50%";
    startButton.style.transform = "translate(-50%, -50%)";
    document.body.appendChild(startButton);

    // Start the game when the button is clicked
    startButton.addEventListener("click", () => {
        document.body.removeChild(startButton); // Remove the start button
        gameLoop(); // Start the game loop
    });

    // Game loop (moved to main.js)
    function gameLoop() {
        if (world.isGameOver) {
            const resetButton = document.createElement("button");
            resetButton.innerText = "Restart Game";
            document.body.appendChild(resetButton);

            resetButton.addEventListener("click", () => {
                document.body.removeChild(resetButton);
                world.resetGame();
                gameLoop(); // Restart the game loop
            });
            return;
        }

        world.update();
        world.draw();
        requestAnimationFrame(gameLoop); // Continue the game loop
    }

    // Add player controls
    document.addEventListener('keydown', (event) => {
        if (['ArrowLeft', 'ArrowRight', ' '].includes(event.key)) {
            event.preventDefault();
        }
        if (event.key === 'ArrowLeft') world.player.move('left');
        if (event.key === 'ArrowRight') world.player.move('right');
        if (event.key === ' ') world.player.shoot();
    });
});