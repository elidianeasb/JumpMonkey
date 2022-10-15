const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


const player = new Player();
const platforms = [new Platform(300, 330), new Platform(500, 460)];

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    player.update()
    platforms.forEach(platform => {
        platform.draw()
    })


    if (keys.right.pressed && player.x < 400) {
        player.velocity.x = 5;
    } else if (keys.left.pressed && player.x > 100) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            platforms.forEach((platform) => {
                platform.x -= 5
            })

        } else if (keys.left.pressed) {
            platforms.forEach((platform) => {
                platform.x += 5
            })

        }
    }

    //plataform collision detection
    platforms.forEach((platform) => {
        if (
            player.y + player.height <= platform.y &&
            player.y + player.height + player.velocity.y >= platform.y &&
            player.x + player.width >= platform.x &&
            player.x <= platform.x + platform.width
        ) {
            player.velocity.y = 0
        }
    })
}



animate()

addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowRight':
            keys.right.pressed = true;
            break;
        case 'ArrowLeft':
            keys.left.pressed = true;
            break;
        case 'ArrowUp': player.velocity.y -= 1
            break;
        case 'ArrowDawn':
            break;

    }
    console.log(keys.right.pressed)
})

document.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'ArrowRight':
            keys.right.pressed = false;
            break;
        case 'ArrowLeft':
            keys.left.pressed = false;
            break;
        case 'ArrowUp': player.velocity.y -= 20


            break;
        case 'ArrowUp':
            break;

    }
    console.log(keys.right.pressed)
})