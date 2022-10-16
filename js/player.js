const gravity = 1.0
class Player {
    constructor() {
        this.speed = 10;
        this.x = 100;
        this.y = 100;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.ctx = ctx
        this.width = 30;
        this.height = 30;


    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
        if (this.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } 
    };
}