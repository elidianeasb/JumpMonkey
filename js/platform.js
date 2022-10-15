class Platform {
    constructor(ctx){
        this.x = 100;
        this.y = 50;
        this.width = 500;
        this.height = 60;  
        this.ctx = ctx;
    }

    draw(){
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(this.x, this.y, this.width, this.height)
    }    
}