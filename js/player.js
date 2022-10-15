const gravity = 0.5
class Player {
    constructor() {
        this.x = 100;
        this.y = canvas.height - 30;
        this.width = 30;
        this.height = 30;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.ctx = ctx


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
        } else {
            this.velocity.y = 0;
        }
    };
}