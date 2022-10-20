/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

document.addEventListener('keyup', (e) => {
    switch (e.code) {
        case 'ArrowLeft':
            keys.left.pressed = false;
            break;

        case 'ArrowRight':
            keys.right.pressed = false;
            break;
    }
})

window.onload = () => {
    const game = new Game(ctx, canvas, keys);

    addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'ArrowLeft':
                keys.left.pressed = true;
                break;

            case 'ArrowRight':
                keys.right.pressed = true;
                break;

            case 'ArrowUp':    
                if(!game.player.isJumping){
                    game.player.isJumping = true;
                    game.decreasePlayerVelocity(15);

                }
                break;                
        }
    })
    //game.start() //REMOVER
    
    document.getElementById("start-button").onclick = () => {
        game.start();
        document.getElementById("intro-screen").style.display = "none";
    };
    document.getElementById("restart-button").onclick = () => {
        game.restart();
        document.getElementById("end-screen").style.display = "none";
    };
};