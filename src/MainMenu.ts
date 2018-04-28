module MyGame {
    export class MainMenu extends Phaser.State {

        private player: Phaser.Sprite;
        private inputs: {
            left: Phaser.Key
        };

        create() {
            this.inputs = 
            { left: this.game.input.keyboard.addKey(Phaser.KeyCode.A) };

            this.player = this.game.add.sprite(this.game.width / 2, this.game.height / 2, "player");
            this.player.animations.add("walk", [1, 2, 3, 4], 5, true);
            this.player.play("walk");
        }
    }
}