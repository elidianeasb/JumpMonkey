const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
console.log(ctx);

const player = new Player(ctx)  
const platform = new Platform(ctx)

const keys = {
    right:{
        pressed: false
    },
    left:{
        pressed: false
    }
}

function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    player.update()
    platform.draw()

    if(keys.right.pressed){
        player.velocity.x = 2;
    }else if(keys.left.pressed){
        player.velocity.x = -2;
    }else{
        player.velocity.x = 0;
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
        case 'ArrowUp': player.velocity.y -=1
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
        case 'ArrowUp': player.velocity.y -=20 


            break;
        case 'ArrowUp':
            break;

    }
    console.log(keys.right.pressed)
})