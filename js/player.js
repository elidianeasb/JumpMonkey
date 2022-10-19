const gravity = 0.7
class Player {
    constructor() {
        this.x = 100;
        this.y = 100;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 90;
        this.height = 120;
        this.speed = 10;
        this.frames = 0;
    }
    
    drawUp() {
        this.image = new Image();
        this.image.src ='../images/monkeyUp.png';
        ctx.drawImage(
            this.image, 
            this.x, 
            this.y, 
            this.width, 
            this.height
        )
    }


    drawMove() {
        this.image = new Image();
        this.image.src ='../images/monkeyMove.png';
        ctx.drawImage(
            this.image, 
            this.x, 
            this.y, 
            this.width, 
            this.height
        )
    }
    
    newPosition() {
        this.x += this.velocity.x
        this.y += this.velocity.y
        
        if (this.y < 0){
            this.velocity.y = 0;
            this.y = 1
            
        }else if (this.velocity.y <= canvas.height){
            this.velocity.y += gravity
        }       
        
        this.drawUp()
    }




    update(){
        this.frames++
        if(this.frames > 16){
            this.frames++
        } 
        
        this.drawMove();
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