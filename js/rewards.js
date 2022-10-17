class Rewards {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
    
    }

    draw() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, this.width, this.height)
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


