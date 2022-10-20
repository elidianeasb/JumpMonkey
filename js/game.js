class Game {
    constructor(ctx, canvas, keys) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.keys = keys;
        this.scrollOffset = 0;
        this.bestScore = 0;
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
        this.button = new Image(25, 25, 150, 60)
        this.button.src = './images/button.png'
        this.ctx.drawImage(this.button, 40, 25, 200, 60)

        this.ctx.font = '28px monospace';
        this.ctx.fillStyle = 'white';
        this.ctx.fillText(`Score: ${this.points}`, 70, 65);
    }

    decreasePlayerVelocity(velocity) {
        this.player.decreaseVelocity(velocity)
    }

    random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    finalScore() {
        return this.points;
    }

    init = () => {
        this.life = 3;

        this.player = new Player();

        this.points = 0;

        //biggest platforms
        const gap = 200;

        this.smallPlatforms = []

        this.platforms = []

        this.floatingPlatforms = []

        const platformCoords = PHASE_ONE.platforms;
        platformCoords.forEach(platform => {
            this.platforms.push(new Platform(platform.x, platform.y, 1024, './images/platform01.png'))
        });


        const floatingPlatformsCoords = PHASE_ONE.floatingPlatforms;
        floatingPlatformsCoords.forEach(floatingPlatform => {
            this.floatingPlatforms.push(new Platform(floatingPlatform.x, floatingPlatform.y, 250, './images/platform04.png'))
        })


        const smallPlatformsCoords = PHASE_ONE.smallPlatforms;
        smallPlatformsCoords.forEach(smallPlatform => {
            this.smallPlatforms.push(new Platform(smallPlatform.x, smallPlatform.y, 512, './images/platform02.png'))
        }) 



        //background image
        this.background = []
        for (let i = 0; i < 27; i++) {
            this.background.push(new Background((1399) * i, 0, './images/BG03.jpg'))
        }

        //Add objects
        /* const trees01Coords = PHASE_ONE.trees01;
        trees01Coords.forEach(tree => {
            this.trees01.push(new Object(tree.x, tree.y, 100, './images/Tree_1.png'))
        })  */



        //Adds Rewards
        this.rewards = []


        const rewardsMinX = 100;
        const rewardsMaxX = 12000;
        const rewardsMinY = 120;
        const rewardsMaxY = 300;


        // FAZ UM RANDOM DESSE NuMERO DE REWARDS PRA TER UM NUMERO ALEATORIO DE MOEDAS NA FASE
        for (let i = 1; i < 27; i++) {

            const randomX = this.random(rewardsMinX, rewardsMaxX);
            const randomY = this.random(rewardsMinY, rewardsMaxY);

            this.rewards.push(new Reward(randomX, randomY));
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

        //draw floating platforms 
        this.floatingPlatforms.forEach((platform) => {
            platform.draw()
        });

        //Add player
        this.player.newPosition();

        //Add rewards        
        this.rewards.forEach((reward) => {
            reward.update();
        })

          //Add objects        
        /* this.trees01.forEach((tree) => {
            tree.draw()
        }); */

        //Add score
        this.score();



        //Scroll the background scenario
        if (this.keys.right.pressed && this.player.x < 400) {
            this.player.startMoving()
        } else if (this.keys.left.pressed && this.player.x > 100 || this.keys.left.pressed && this.scrollOffset === 0 &&
            this.player.x > 0) {
                this.player.stopMoving()
        } else {            
            if (this.keys.right.pressed) {
                this.player.startStaticMoving()
                this.scrollOffset += this.player.speed

                this.platforms.forEach((platform) => {
                    platform.x -= this.player.speed
                })

                this.smallPlatforms.forEach((platform) => {
                    platform.x -= this.player.speed
                })

                this.floatingPlatforms.forEach((platform) => {
                    platform.x -= this.player.speed
                })


                this.background.forEach((objects) => {
                    objects.x -= this.player.speed * 0.66
                })

                this.rewards.forEach((reward) => {
                    reward.x -= this.player.speed
                })

                /* this.trees01.forEach((trees) => {
                    trees.x -= this.player.speed
                }) */
            } else {
                // PREVENT FROM KEEP MOVING AFTER RELEASE RIGHT KEY
                this.player.stopMoving()
            }
        }

        //plataform collision detection

        const crashedWith = (platforms) => {
            platforms.forEach((platform) => {
                if (
                    this.player.y + this.player.height <= platform.y &&
                    this.player.y + this.player.height + this.player.velocity.y >= platform.y &&
                    this.player.x + this.player.width >= platform.x &&
                    this.player.x <= platform.x + platform.width
                ) {
                    this.player.velocity.y = 0
                    this.player.isJumping = false;
                }
            })
        }

        crashedWith(this.platforms);
        crashedWith(this.smallPlatforms);
        crashedWith(this.floatingPlatforms);


        //win condition
        if (this.scrollOffset > 2000) {
            //console.log('you win')
        }

        //lose condition
        if (this.player.y > this.canvas.height) {
            this.gameover = true;
        }

        this.rewardColision();
    }

    update = () => {
        requestAnimationFrame(this.update)
        if (this.gameover) {
            document.getElementById("end-screen").style.display = "flex";
            document.getElementById("final-score").innerHTML = this.points;
            if (this.points > this.bestScore){
                this.bestScore = this.points
                document.getElementById("best-score").innerHTML = this.bestScore;
            }
        } else {
            this.gameAnimation();
        }
    }

    rewardColision = () => {
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