class Reward {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 40;
        this.height = 40
        this.frames = 0;
        this.coinPhase = 0;
    
    }

    draw() {
        this.image = new Image();
        this.image.src ='./images/coin.png';
        ctx.drawImage(
            this.image,
            84 * this.coinPhase,
            0,
            84,
            84, 
            this.x, 
            this.y, 
            this.width, 
            this.height
        )
    }
    
    update(){
        this.frames++
        if(this.frames % 20 === 0){
            this.coinPhase++
        } 
        if(this.coinPhase > 5){
            this.coinPhase = 0;
        }
        this.draw();
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


