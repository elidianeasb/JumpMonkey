class Platform {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 200;
        this.height = 20;  
    
    }

    draw(){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }    
}