class Platform {
    constructor(x, y, width) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 20;      
    }

    draw(){
        this.image = new Image();
        this.image.src ='../images/platform.png';
        ctx.drawImage(this.image, this.x, this.y)
    }    
}

