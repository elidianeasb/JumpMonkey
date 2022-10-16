class GenericObject {
    constructor(x, y, imageSrc) {
        this.x = x;
        this.y = y;
        const image = new Image();
        image.src = imageSrc;
        this.image = image;    
    }

    draw(){      
        ctx.drawImage(this.image, this.x, this.y)
    }    
}