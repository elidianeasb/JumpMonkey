const gravity = 0.5
class Player {
    constructor(/* x, y, imageSrc */) {
        this.x = 100;
        this.y = 250;
        this.velocity = {
            x: 0,
            y: 0
        }
        //this.ctx = ctx
        this.width = 50;
        this.height = 100;
        const image = new Image();
        //image.src = imageSrc;
        //this.image = image; 
        this.speed = 10;
        this.frames = 0;
    }
    
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height)
        //ctx.drawImage(this.image, 177 * this.frames, 0, 177  , 400, this.x, this.y, this.width, this.height)
    }
    
    newPosition() {
        if (this.frames > 28) this.frames = 0;
        this.frames++
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
        if (this.y + this.height + this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } 
    }    

}