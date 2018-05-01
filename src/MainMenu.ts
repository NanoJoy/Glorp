module MyGame {
    export class MainMenu extends Phaser.State {

        private player: Player;
        private inputs: Inputs;

        create() {
            this.inputs = {
                 left: this.game.input.keyboard.addKey(Phaser.KeyCode.A),
                 right: this.game.input.keyboard.addKey(Phaser.KeyCode.D),
                 up: this.game.input.keyboard.addKey(Phaser.KeyCode.W),
                 down: this.game.input.keyboard.addKey(Phaser.KeyCode.S)
            };

            this.player = new Player(this.game, this.inputs, this.game.width / 2, this.game.height / 2);
        }

        update() {
            this.player.update();
        }
    }
}