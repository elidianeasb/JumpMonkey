const gravity = 0.5
class Player {
    constructor() {
        this.x = 100;
        this.y = 0;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 50;
        this.height = 100;
        this.speed = 5;
    }
    
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    
    newPosition() {
        this.draw()
        this.x += this.velocity.x
        this.y += this.velocity.y
        if (this.velocity.y <= canvas.height) {
            this.velocity.y += gravity
        } 
    }

    decreaseVelocity(velocity) {
        this.velocity.y -= velocity;
    }
    
    setNewPosition(newPosition){
        this.x = newPosition; 
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