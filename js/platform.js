class Platform {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 550;
        this.height = 20;      
    }

    draw(){
        this.image = new Image();
        this.image.src ='../images/platform.png';
        ctx.drawImage(this.image, this.x, this.y)
    }    
}

