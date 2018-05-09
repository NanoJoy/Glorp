module MyGame {
    export class Ground extends Phaser.Sprite {
        constructor (state: Main, x: number, y: number) {
            super(state.game, x * Constants.TILE_WIDTH, y * Constants.TILE_HEIGHT, "grounds");
            var frames = [0, 0, 0, 0, 0, 1, 2, 3, 4, 5];
            this.frame = frames[Math.floor(Math.random() * 10)];
            state.game.add.existing(this);
        }
    }
}