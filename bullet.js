// bullet.js
// Bullet class represents a projectile fired by the player.
class Bullet {
    constructor(x, y, speed) {
        this.x = x; // X position of the bullet
        this.y = y; // Y position of the bullet
        this.width = 5;
        this.height = 32;
        this.speed = speed; // Speed at which the bullet moves
        this.sprite = new Image();
        this.sprite.src = 'sprites/bullet.jpg';
    }
    
    // Moves the bullet upwards or downwards depending on speed.
    update() {
        this.y += this.speed;
    }
    
    // Draws the bullet on the canvas.
    draw(ctx) {
        if (this.sprite.complete && this.sprite.naturalWidth !== 0) {
            ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
        }
    }
}