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

function startGame() {
    const game = new Game(ctx, canvas, keys);
    game.start()

    addEventListener('keydown', (e) => {
        switch (e.code) {
            case 'ArrowLeft':
                keys.left.pressed = true;
                break;

            case 'ArrowRight':
                keys.right.pressed = true;
                break;

            case 'ArrowUp':
                game.decreaseVelocity(20)
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
        }
    })
}

startGame();