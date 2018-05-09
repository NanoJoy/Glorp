module MyGame {
    export class Water extends Phaser.Sprite {
        constructor(state: Main, x: number, y: number) {
            super(state.game, x * Constants.TILE_WIDTH, y * Constants.TILE_HEIGHT, "water");
            state.game.physics.arcade.enable(this);
            this.body.moves = false;
            this.body.immoveable = true;
            this.animations.add("wave", SpriteUtils.animationArray(0, 4), 2, true);
            this.play("wave");
            state.groups.water.add(this);
        }
    }
}