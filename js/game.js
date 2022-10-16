class Game {
    constructor() {
        this.ctx = ctx;
        //this.player = player;
        this.canvas = canvas;
        this.keys = keys;
        //this.animate;
        this.init()
        this.scrollOffset = 0;
        this.controls = null;
    }

    start() {
        this.animate()
        /* this.controls = new Controls(this.character);
        this.controls.keyboardEvents(); */
    }

    decreaseVelocity(velocity) {
        this.player.velocity.y -= velocity;
    }

    init = () => {
        this.player = new Player(100, 100, '../images/spriteStandRight.png');
        const gap = 200;
        const width = 550;
        this.platforms = [
            new Platform(0, 460, width),
            new Platform(750, 460, width),
            new Platform(1000, 460, width),
            new Platform(1500, 460, width),
        ];

        this.genericObjects = [
            new GenericObject(0, 0, '../images/background.png'),
            new GenericObject(0, 100, '../images/hills.png')
        ];
    }


    animate = () => {
        requestAnimationFrame(this.animate)
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        //Adds new objects to the game scenario
        this.genericObjects.forEach((genericObjects) => {
            genericObjects.draw()
        });

        //Adds ground 
        this.platforms.forEach((platform) => {
            platform.draw()
        });

        this.player.newPosition();

        //Scroll the background scenario
        if (this.keys.right.pressed && this.player.x < 400) {
            this.player.velocity.x = this.player.speed;
        } else if (this.keys.left.pressed && this.player.x > 100 || this.keys.left.pressed && this.scrollOffset === 0 && 
            this.player.x > 0){
            this.player.velocity.x = -this.player.speed;
        } else {
            this.player.velocity.x = 0;

            if (this.keys.right.pressed) {
                this.scrollOffset += this.player.speed
                this.platforms.forEach((platform) => {
                    platform.x -= this.player.speed
                })

                this.genericObjects.forEach((objects) => {
                    objects.x -= this.player.speed * 0.66
                })

            } else if (this.keys.left.pressed && this.scrollOffset > 0) {
                this.scrollOffset -= this.player.speed
                this.platforms.forEach((platform) => {
                    platform.x += this.player.speed
                })
                this.genericObjects.forEach((objects) => {
                    objects.x += this.player.speed * 0.66
                })
            }
        }

        //plataform collision detection
        this.platforms.forEach((platform) => {
            if (
                this.player.y + this.player.height <= platform.y &&
                this.player.y + this.player.height + this.player.velocity.y >= platform.y &&
                this.player.x + this.player.width >= platform.x &&
                this.player.x <= platform.x + platform.width
            ) {
                this.player.velocity.y = 0
            }
        })

        //win condition
        if (this.scrollOffset > 2000) {
            console.log('you win')
        }

        //lose condition
        if (this.player.y > this.canvas.height) {
            console.log('you lose')
            this.init()
        }
    }
}