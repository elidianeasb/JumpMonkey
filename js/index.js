const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');



const player = new Player();
const platforms = [
    new Platform(-1, 460), 
    new Platform(500, 460),
    new Platform(1500, 460),
    new Platform(900, 260),
];


const genericObjects = [
    new GenericObject(0, 0, '../images/background.png'),
    new GenericObject(0, 100, '../images/hills.png')
];


const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0;


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
        player.velocity.x = 5;
    } else if (keys.left.pressed && player.x > 100) {
        player.velocity.x = -5;
    } else {
        player.velocity.x = 0;

        if (keys.right.pressed) {
            scrollOffset +=5
            platforms.forEach((platform) => {
                platform.x -= 5
            })

            genericObjects.forEach((objects) => {
                objects.x -=3
            })

        } else if (keys.left.pressed) {
            scrollOffset -=5
            platforms.forEach((platform) => {
                platform.x += 5
            })
            genericObjects.forEach((objects) => {
                objects.x +=3
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
    if (scrollOffset > 2000){
        //console.log('you win')
    }

    //lose condicion
    if (player.y > canvas.height){
        //console.log('you lose')
        init()


    }
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
 

    }
    console.log(keys.right.pressed)
})