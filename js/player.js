const gravity = 0.8
class Player {
    constructor(x, y, imageSrc) {
        this.speed = 10;
        this.x = x;
        this.y = y;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.ctx = ctx
        this.width = 66;
        this.height = 150;
        const image = new Image();
        image.src = imageSrc;
        this.image = image; 
        this.frame = 0;
    }

    draw() {
        ctx.drawImage(this.image, 0, 0, 177, 400, this.x, this.y, this.width, this.height)
    }

    newPosition() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
        if (this.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } 
    }    

}