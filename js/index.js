/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let player, platforms, genericObjects, keys, scrollOffset;


function init() {
    player = new Player();
    platforms = [
        new Platform(-1, 460),
        new Platform(500, 460),
        new Platform(1500, 460),
        new Platform(900, 260),
    ];


    genericObjects = [
        new GenericObject(0, 0, '../images/background.png'),
        new GenericObject(0, 100, '../images/hills.png')
    ];


    keys = {
        right: {
            pressed: false
        },
        left: {
            pressed: false
        }
    }

    scrollOffset = 0;
}



function animate() {
    requestAnimationFrame(animate)
    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    //Adds new objects to the game scenario
    genericObjects.forEach((genericObjects) => {
        genericObjects.draw()
    });

    //Adds ground 
    platforms.forEach((platform) => {
        platform.draw()
    });

    player.update();


    if (keys.right.pressed && player.x < 400) {
        player.velocity.x = player.speed;
    } else if (keys.left.pressed && player.x > 100) {
        player.velocity.x = -player.speed;
    } else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scrollOffset += player.speed
            platforms.forEach((platform) => {
                platform.x -= player.speed
            })

            genericObjects.forEach((objects) => {
                objects.x -= player.speed * 0.66
            })

        } else if (keys.left.pressed) {
            scrollOffset -= player.speed
            platforms.forEach((platform) => {
                platform.x += player.speed
            })
            genericObjects.forEach((objects) => {
                objects.x += player.speed * 0.66
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

    //win condition
    if (scrollOffset > 2000) {
        //console.log('you win')
    }

    //lose condition
    if (player.y > canvas.height) {
        //console.log('you lose')
        //init();
    }
}




addEventListener('keydown', (e) => {
    switch (e.code) {
        case 'ArrowLeft':
            keys.left.pressed = true;
            break;

        case 'ArrowRight':
            keys.right.pressed = true;
            break;

        case 'ArrowUp': 
        player.velocity.y -= 20
            break;
    }
})

document.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'ArrowLeft':
            keys.left.pressed = false;
            break;

        case 'ArrowRight':
            keys.right.pressed = false;
            break;

        case 'ArrowUp': 
            //player.velocity.y -= 50
            break;
    }
})

init()
animate()