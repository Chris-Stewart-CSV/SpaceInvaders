// enemy.js
// Enemy class represents an enemy in the game.
class Enemy {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 75;
        this.height = 74;
        this.speedX = 1; // Horizontal movement speed
        this.speedY = 50; // Vertical movement speed
        this.health = 3; // Enemy health points
        this.sprite = new Image();
        this.sprite.src = 'sprites/enemy.png';
    }

    // Reduces enemy health when hit by a bullet and returns if the enemy is destroyed.
    takeDamage() {
        this.health--;
        return this.health <= 0;
    }

    /*
        TODO - Make enemy fire back at the player
    */

    // Draws the enemy and its health bar.
    draw(ctx) {
        if (this.sprite.complete && this.sprite.naturalWidth !== 0) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
        
        // Draw health bar
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y - 10, this.width * (this.health / 3), 5);
        ctx.strokeStyle = "white";
        ctx.strokeRect(this.x, this.y - 10, this.width, 5);
    }
}
