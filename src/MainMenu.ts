module MyGame {
    export class MainMenu extends Phaser.State {

        private ball: Phaser.Sprite;
        private inputs: {
            left: Phaser.Key
        };

        create() {
            this.inputs = 
            { left: this.game.input.keyboard.addKey(Phaser.KeyCode.A) };

            this.ball = this.game.add.sprite(this.game.width / 2, this.game.height / 2, "ball");
        }

        update() {
            if (this.inputs.left.isDown) {
                this.ball.alpha -= 0.02;
            }
        }
    }
}