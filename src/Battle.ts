module MyGame {
    export class Battle extends Phaser.State {
        public inputs: Inputs;

        create () {
            this.inputs = {
                left: this.game.input.keyboard.addKey(Phaser.KeyCode.A),
                right: this.game.input.keyboard.addKey(Phaser.KeyCode.D),
                up: this.game.input.keyboard.addKey(Phaser.KeyCode.W),
                down: this.game.input.keyboard.addKey(Phaser.KeyCode.S),
                O: this.game.input.keyboard.addKey(Phaser.KeyCode.O),
                K: this.game.input.keyboard.addKey(Phaser.KeyCode.K)
           };

           var patternDisplayer = new PatternDisplayer(this, 4, 8, 16, 4, 500);
           patternDisplayer.display();
        }
    }
}