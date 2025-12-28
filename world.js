// world.js
class World {
    constructor() {
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);
        this.resizeCanvas();
        window.addEventListener("resize", () => this.resizeCanvas());

        // Create player at bottom middle
        this.player = new Player(this.canvas.width / 2, this.canvas.height - 100);
        this.enemyManager = new EnemyManager(this.canvas.width);
        this.isGameOver = false;
        this.wavesSurvived = 0; // Track waves survived
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight * 0.9;
    }

    update() {
        this.player.bullets.forEach((bullet) => bullet.update());
        this.enemyManager.update();
        this.checkCollisions();

        // If all enemies are defeated, increase the wave and respawn enemies
        if (this.enemyManager.enemies.length === 0) {
            this.enemyManager.wave++; // Increase wave
            this.wavesSurvived++; // Track waves completed
            this.enemyManager = new EnemyManager(this.canvas.width);
            this.enemyManager.wave = this.wavesSurvived + 1; // Carry over wave count
        }
    }

    checkCollisions() {
        this.player.bullets.forEach((bullet, bIndex) => {
            this.enemyManager.enemies.forEach((enemy, eIndex) => {
                if (
                    bullet.x < enemy.x + enemy.width &&
                    bullet.x + bullet.width > enemy.x &&
                    bullet.y < enemy.y + enemy.height &&
                    bullet.y + bullet.height > enemy.y
                ) {
                    this.player.bullets.splice(bIndex, 1);
                    if (enemy.takeDamage()) {
                        this.enemyManager.enemies.splice(eIndex, 1);
                        this.player.score += 100;
                    }
                }
            });
        });

        // Check for enemy collision with player
        this.enemyManager.enemies.forEach(enemy => {
            if (
                enemy.x < this.player.x + this.player.width &&
                enemy.x + enemy.width > this.player.x &&
                enemy.y < this.player.y + this.player.height &&
                enemy.y + enemy.height > this.player.y ||
				enemy.y + enemy.height >= this.canvas.y
            ) {
                this.isGameOver = true;
            }
        });
		
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
        this.player.draw(this.ctx);
        this.player.bullets.forEach((bullet) => bullet.draw(this.ctx));
        this.enemyManager.draw(this.ctx);
				
        this.ctx.fillStyle = "white";
        this.ctx.font = "20px Arial";
        this.ctx.fillText(`Score: ${this.player.score}`, 10, 30);
        this.ctx.fillText(`Wave: ${this.wavesSurvived + 1}`, 10, 60);
    
        if (this.isGameOver) {
			
			// Game Over
            this.ctx.font = "50px Arial";
            let gameOverText = "Game Over";
            let gameOverWidth = this.ctx.measureText(gameOverText).width;
            this.ctx.fillText(gameOverText, (this.canvas.width - gameOverWidth) / 2, 100);
			
			// You survived X waves
            this.ctx.font = "30px Arial";
            let wavesText = `You survived ${this.wavesSurvived} waves!`;
            let wavesWidth = this.ctx.measureText(wavesText).width;
            this.ctx.fillText(wavesText, (this.canvas.width - wavesWidth) / 2, 150);

			// Your score was X
			this.ctx.font = "30px Arial";
			let finalScoreText = `Final score: ${this.player.score}`;
			let finalScoreWidth = this.ctx.measureText(finalScoreText).width;
			this.ctx.fillText(finalScoreText, (this.canvas.width - finalScoreWidth) / 2, 200);
			
			// Number of shots fired
			this.ctx.font = "30px Arial";
			let bulletsFiredText = `You fired ${this.player.bulletsFired} bullets!`;
			let bulletsFiredWidth = this.ctx.measureText(bulletsFiredText).width;
			this.ctx.fillText(bulletsFiredText, (this.canvas.width - bulletsFiredWidth) / 2, 250);
			
            // TODO - add a score board (state management)

        }

        // Draw player controls in the top right corner of the screen
		let offsetFromEdge = 20;
		this.ctx.font = "20px Arial";
		let controlMoveText = `Move: Left Arrow | Right Arrow`;
		let controlMoveWidth = this.ctx.measureText(controlMoveText).width;
		this.ctx.fillText(controlMoveText, (this.canvas.width - controlMoveWidth - offsetFromEdge), 30);
		let controlShootText = `Shoot: Spacebar (Press | Hold)`
		let controlShootWidth = this.ctx.measureText(controlShootText).width;
		this.ctx.fillText(controlShootText, (this.canvas.width - controlShootWidth - offsetFromEdge), 60);
		
    }    

    resetGame() {
        this.isGameOver = false;
        this.wavesSurvived = 0; // Reset waves
        this.player = new Player(this.canvas.width / 2, this.canvas.height - 100);
        this.enemyManager = new EnemyManager(this.canvas.width);
    }
}