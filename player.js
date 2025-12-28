// player.js
// Represents the player character with walking animations.
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 53;
        this.height = 75;
        this.speed = 10; // Reduced for smoother movement; adjust as needed
        
        // Sprite Management
        this.sprites = [];
        this.loadSprites([
            'sprites/player_center.png', // Index 0: Stationary
            'sprites/player_turnLeft_1.png', // Index 1: Walk Cycle A
            'sprites/player_turnLeft_2.png'  // Index 2: Walk Cycle B
        ]);
        
        this.currentSpriteIndex = 0;
        this.isMoving = false;
        this.facing = 'right'; // Tracks which way to flip the image
        this.animationTimer = 0;
        this.animationSpeed = 1; // Change frame every 8 ticks

        this.bullets = []; 
        this.bulletsFired = 0;
        this.score = 0;
        this.isAlive = true;
        this.shootSound = new Audio('audio/shoot.mp3');
    }

    loadSprites(urls) {
        urls.forEach(url => {
            let img = new Image();
            img.src = url;
            this.sprites.push(img);
        });
    }

    // Call this in the main game loop before drawing
    update() {
		// 1. Animation Logic
		if (this.isMoving) {
			this.animationTimer++;
			if (this.animationTimer % this.animationSpeed === 0) {
				this.currentSpriteIndex = (this.currentSpriteIndex === 1) ? 2 : 1;
			}
		} else {
			this.currentSpriteIndex = 0;
			this.animationTimer = 0;
		}

		// This keeps only bullets that are still on the screen
		this.bullets = this.bullets.filter(bullet => !bullet.isOffScreen());

		// Reset Movement Flag
		this.isMoving = false;
	}

    move(direction) {
        this.isMoving = true;
        this.facing = direction; // Update facing direction

        if (direction === 'left') this.x -= this.speed;
        if (direction === 'right') this.x += this.speed;
    }

    shoot() {
        this.bullets.push(new Bullet(this.x + this.width / 2, this.y, -50));
        this.bulletsFired++;
        //this.shootSound.play(); // The sound file is pretty loud, will fix
    }

    draw(ctx) {
        const currentImg = this.sprites[this.currentSpriteIndex];
        if (!currentImg || !currentImg.complete) return;

        ctx.save(); // Save current state (rotation, scaling, etc.)

        if (this.facing === 'left') {
            // 1. Move context to player center
            // 2. Flip horizontally using scale(-1, 1)
            // 3. Draw image offset back by half width
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            ctx.scale(-1, 1);
            ctx.drawImage(currentImg, -this.width / 2, -this.height / 2, this.width, this.height);
        } else {
            // Normal drawing for 'right'
            ctx.drawImage(currentImg, this.x, this.y, this.width, this.height);
        }

        ctx.restore(); // Restore state so other objects don't draw flipped
    }

}
