module MyGame {
    export class Inputs {
        left: Phaser.Key;
        right: Phaser.Key;
        up: Phaser.Key;
        down: Phaser.Key;
        K: Phaser.Key;
        O: Phaser.Key;
        spacebar: Phaser.Key;

        constructor(game: Phaser.State) {
            this.left = game.input.keyboard.addKey(Phaser.KeyCode.A);
            this.right = game.input.keyboard.addKey(Phaser.KeyCode.D);
            this.up = game.input.keyboard.addKey(Phaser.KeyCode.W);
            this.down = game.input.keyboard.addKey(Phaser.KeyCode.S);
            this.O = game.input.keyboard.addKey(Phaser.KeyCode.O);
            this.K = game.input.keyboard.addKey(Phaser.KeyCode.K);
            this.spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
        }

        asArray(): Phaser.Key[] {
            return [this.left, this.right, this.up, this.down, this.K, this.O, this.spacebar];
        }
    }
}