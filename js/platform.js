class Platform {
    constructor(x, y, width, imageSrc) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = 10;
        const image = new Image();
        image.src = imageSrc;
        this.image = image;      
    }

    draw(){
        ctx.drawImage(this.image, this.x, this.y)
    }    
}





