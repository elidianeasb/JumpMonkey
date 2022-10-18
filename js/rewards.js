class Reward {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 150;
        this.height = 100;
    
    }

    draw() {
        this.image = new Image();
        this.image.src ='../images/coin.png';
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
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


