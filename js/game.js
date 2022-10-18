class Game {
    constructor() {
        this.ctx = ctx;
        this.canvas = canvas;
        this.keys = keys;
        this.scrollOffset = 0;

        this.init();
    }

    start() {
        this.update();
    }

    restart() {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.gameover = false;

        this.init();
    }

    score() {
        this.button = new Image(40, 25, 200, 60)
        this.button.src = '../images/button.png'
        this.ctx.drawImage(this.button, 40, 25, 200, 60)

        this.ctx.font = '28px monospace';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Store: ${this.points}`, 70, 65);
    }

    decreasePlayerVelocity(velocity) {
        this.player.decreaseVelocity(velocity)
    }

    init = () => {
        this.life = 3;

        this.player = new Player();
        
        this.points = 0;
        
        //biggest platforms
        const gap = 1000;
        this.platforms = []
        for (let i = 0; i < 27; i++) {
            this.platforms.push(new Platform((1024 + gap) * i, 450, 1024, '../images/platform01.png'))
        }

        //smallest platforms
        this.smallPlatforms = [new Platform(500, 350, 512, '../images/platform02.png')]

        //bachgraoung image
        this.background = []
        for (let i = 0; i < 27; i++) {
            this.background.push(new Background((994) * i, 0, '../images/BG.png'))
        }
        /* new Background(0, 0, '../images/BG.png'),
        //new GenericObject(0, 20, '../images/hills.png') */


        //Adds Rewards
        this.rewards = []
        for (let i = 1; i < 20; i++) {
            const element = i[i];
            this.rewards.push(new Reward((600 + i) * i + 3, 100));
        }
    }

    gameAnimation = () => {
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)

        //Adds new objects to the game scenario
        this.background.forEach((background) => {
            background.draw()
        });

        //draw small platforms 
        this.smallPlatforms.forEach((platform) => {
            platform.draw()
        });


        //draw big platforms 
        this.platforms.forEach((platform) => {
            platform.draw()
        });

        //Add player
        this.player.newPosition();

        //Add rewards        
        this.rewards.forEach((reward) => {
            reward.draw()
        })

        //Add score
        this.score();

        //ADD LIFE 

        //Scroll the background scenario
        if (this.keys.right.pressed && this.player.x < 400) {
            this.player.velocity.x = this.player.speed;
        } else if (this.keys.left.pressed && this.player.x > 100 || this.keys.left.pressed && this.scrollOffset === 0 &&
            this.player.x > 0) {
            this.player.velocity.x = -this.player.speed;
        } else {
            this.player.velocity.x = 0;
            if (this.keys.right.pressed) {
                this.scrollOffset += this.player.speed

                this.platforms.forEach((platform) => {
                    platform.x -= this.player.speed
                })

                this.smallPlatforms.forEach((platform) => {
                    platform.x -= this.player.speed
                })


                this.background.forEach((objects) => {
                    objects.x -= this.player.speed * 0.66
                })

                this.rewards.forEach((reward) => {
                    reward.x -= this.player.speed
                })
            }
        }

        //plataform collision detection
        const platformPadding = 5 // Ajusting the player position over the platform
        this.platforms.forEach((platform) => {
            if (
                this.player.y + this.player.height <= platform.y + platformPadding &&
                this.player.y + this.player.height + this.player.velocity.y >= platform.y + platformPadding &&
                this.player.x + this.player.width >= platform.x &&
                this.player.x <= platform.x + platform.width
            ) {
                this.player.velocity.y = 0
            }
        })

        this.smallPlatforms.forEach((platform) => {
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
            //console.log('you win')
        }

        //lose condition
        if (this.player.y > this.canvas.height) {
            this.gameover = true;
        }

        this.checkColision();
    }

    update = () => {
        requestAnimationFrame(this.update)
        if (this.gameover) {
            document.getElementById("end-screen").style.display = "block";
        } else {
            this.gameAnimation();
        }
    }

    checkColision = () => {
        let rewardColided;
        const crashed = this.rewards.some((reward) => {  //some methods 
            rewardColided = reward;
            return this.player.crashWith(reward);
        })

        if (crashed) {
            this.rewards = this.rewards.filter((reward) => {
                return reward.x !== rewardColided.x
            })
            this.points++;
        }
    }


}