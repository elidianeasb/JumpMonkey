const gravity = 0.7
class Player {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 50;
        this.height = 100;
        this.speed = 10;
    }
    
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    
    newPosition() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y

        if (this.y < 0){
            this.velocity.y = 0;
            this.y = 1
    
        }else if (this.velocity.y <= canvas.height){
            this.velocity.y += gravity
        }       
    
    }

    decreaseVelocity(velocity) {
        this.velocity.y -= velocity
    } 
    
    left(){
        return this.x;
    }
    right(){
        return this.x + this.width
    }
    top(){
        return this.y
    }

    bottom(){
        return this.y + this.height
    }

    crashWith(object) {
        return !(
            this.bottom() < object.top() ||
            this.top() > object.bottom() ||
            this.right() < object.left() ||
            this.left() > object.right()
        );
    }
}