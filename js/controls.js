/* class Controls {
    constructor(character) {
        this.character = character;
    }

    keyboardEvents() {

        const keys = {
            right: {
                pressed: false
            },
            left: {
                pressed: false
            }
        }

        window.addEventListener('keydown', (e) => {
            const this.game = new Game();
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

        window.addEventListener('keyup', (e) => {
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
} */