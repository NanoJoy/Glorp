module MyGame {
    var frames = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5];
    export class Ground extends Phaser.Sprite {
        constructor (state: Main, x: number, y: number) {
            super(state.game, x * TILE_WIDTH, y * TILE_HEIGHT, Assets.Sprites.Grounds.key);
            this.frame = frames[Math.floor(Math.random() * frames.length)];
            state.game.add.existing(this);
        }
    }
}