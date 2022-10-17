const gravity = 0.5
class Player {
    constructor() {
        this.x = 100;
        this.y = 250;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 50;
        this.height = 100;
        this.speed = 5;
        this.frames = 0;
    }
    
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height)
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
    
    left(){
        return this.x;
    }
    right(){
        return this.x + this.w
    }
    top(){
        return this.y
    }

    bottom(){
        return this.y + this.h
    }

    crashWith(coin) {
        return !(
            this.bottom() < coin.top() ||
            this.top() > coin.bottom() ||
            this.right() < coin.left() ||
            this.left() > coin.right()
        );
    }
}