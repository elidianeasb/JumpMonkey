const gravity = 0.7
class Player {
    constructor() {
        this.speed = 5;
        this.x = 100;
        this.y = 100;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 54;
        this.height = 98;
        this.frames = 0;

        // CONTROL THE PLAYER ANIMATION
        this.playerPhase = 0;
        this.stillMoving = false;
        this.isJumping = false;
    }
    
    drawUp() {
        this.image = new Image();
        this.image.src ='./images/monkeyUp.png';
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
        this.image.src ='./images/monkeyMove.png';      
        ctx.drawImage(            
            this.image,
            98 * this.playerPhase,
            0,
            98,
            84,
            this.x, 
            this.y, 
            80, 
            98
        )
    }

    // NO AMIMATION NEIGHTER VELOCITY
    stopMoving() {
        this.velocity.x = 0
        this.stillMoving = false;
    } 

    // ANIMATION AND VELOCITY TOGHETER
    startMoving() {
        this.velocity.x = this.speed
        this.stillMoving = true;
    } 

    // ANIMATION WITHOUT VELOCITY TO FOLLOW THE SCNARIO SCROLLING
    startStaticMoving() {
        this.velocity.x = 0
        this.stillMoving = true
    }

    draw() {
        this.frames++;
        if(this.frames % 2 === 0){
            this.playerPhase++
        } 
        if(this.playerPhase > 15){
            this.playerPhase = 0
        }

        if(this.velocity.x > 0 || this.stillMoving) {
            this.drawMove()
        } else {
            this.drawUp()
        }
    } 
    
    newPosition() {
        this.draw();

        this.x += this.velocity.x
        this.y += this.velocity.y
        
        if (this.y < 0){
            this.velocity.y = 0;
            this.y = 1
            
        } else if (this.velocity.y <= canvas.height){
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