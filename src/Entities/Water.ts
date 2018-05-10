module MyGame {
    export class Water extends Phaser.Sprite {
        collisionCheck: (a: Phaser.Sprite, b: Phaser.Sprite) => boolean;

        constructor(state: Main, x: number, y: number) {
            super(state.game, x * Constants.TILE_WIDTH, y * Constants.TILE_HEIGHT, "water");
            state.game.physics.arcade.enable(this);
            this.body.moves = false;
            this.body.immoveable = true;
            this.animations.add("wave", SpriteUtils.animationArray(0, 4), 2, true);
            this.play("wave");
            state.groups.water.add(this);
            this.collisionCheck = null;
        }
    }

    export class WaterEdge extends Water {
        constructor(state: Main, x: number, y: number) {
            super(state, x, y);
            this.collisionCheck = function (a, b) {
                return true;
            }
        }
    }
}