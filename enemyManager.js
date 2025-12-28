// enemyManager.js
// Manages enemy spawning and movement logic.
class EnemyManager {
    constructor(canvasWidth) {
        this.enemies = [];
        this.direction = 1; // 1 moves right, -1 moves left
        this.canvasWidth = canvasWidth;
        this.wave = 1; // Track the current wave
        this.spawnEnemies();
    }

    // Creates a wave of enemies.
    spawnEnemies() {
        const numEnemies = 8;
        const spacing = 160;
        const startX = (this.canvasWidth - (numEnemies * spacing)) / 2;
        for (let i = 0; i < numEnemies; i++) {
            let enemy = new Enemy(startX + i * spacing, 50);
            enemy.speedX += this.wave; // Increase speed per wave
            this.enemies.push(enemy);
        }
    }

    // Updates enemy positions and movement logic.
    update() {
        let shouldMoveDown = false;
        for (let enemy of this.enemies) {
            enemy.x += enemy.speedX * this.direction;
        }
        
        // Check if enemies hit screen edges
        for (let enemy of this.enemies) {
            if ((this.direction === 1 && enemy.x + enemy.width >= this.canvasWidth) ||
                (this.direction === -1 && enemy.x <= 0)) {
                shouldMoveDown = true;
                break;
            }
			if((this.direction === 1 && enemy.y + enemy.heiht >= this.canvasHeight) ||
				(this.direction === -1 && enemy.y <= 0)){
					shouldMoveDown = false;
				break;
			}
        }
        
        // Move down and change direction if needed
        if (shouldMoveDown) {
            this.direction *= -1;
            for (let enemy of this.enemies) {
                enemy.y += enemy.speedY;
            }
        }
    }

    // Draws all enemies on the canvas.
    draw(ctx) {
        for (let enemy of this.enemies) {
            enemy.draw(ctx);
        }
    }
}