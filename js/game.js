class Game {
    constructor() {
        this.ctx = ctx;
        this.canvas = canvas;
        this.keys = keys;
        this.init()
        this.scrollOffset = 0;
        this.controls = null;
        this.gameover = false;
        this.life = 3;
    }

    start() {
        this.update()
    }

    score() {
        this.ctx.font = '22px monospace';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Score: ${this.points}`, 100, 50);
    }


    decreaseVelocity(velocity) {
        this.player.velocity.y -= velocity;
    }

    init = () => {
        this.player = new Player();
        const gap = 200;
        const width = 1024;

        this.points = 0;

        this.platforms = []
        for (let i = 0; i < 27; i++) {
            this.platforms.push(new Platform((width + gap) * i, 400, width))
        }



        this.background = []
        for (let i = 0; i < 27; i++) {
                this.background.push(new Background((width-30) * i, 0, '../images/BG.png'))
            }
            /* new Background(0, 0, '../images/BG.png'),
            //new GenericObject(0, 20, '../images/hills.png') */
    

        //Adds Rewards
        this.rewards = []
        for (let i = 1; i < 100; i++) {
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


        //Adds ground 
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

    drawGameOver = () => {
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.font = '80px monospace';
        this.ctx.fillStyle = 'red';
        this.ctx.fillText(`Game Over`, 380, 250);

        this.ctx.fillRect(380, 300, 100, 50);
        document.getElementById("canvas-screen").style.display = "none";
        document.getElementById("end-screen").style.display = "block";
    }

    update = () => {
        requestAnimationFrame(this.update)
        console.log(this.gameover)
        if (this.gameover) {
            this.drawGameOver();
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