module MyGame {
    export abstract class Water extends Phaser.Sprite {
        collisionCheck: (a: Phaser.Sprite, b: Phaser.Sprite) => boolean;

        constructor(state: Main, x: number, y: number, animStart: number) {
            super(state.game, x * Constants.TILE_WIDTH, y * Constants.TILE_HEIGHT, "water");
            state.game.physics.arcade.enable(this);
            this.body.moves = false;
            this.body.immoveable = true;
            this.animations.add("wave", SpriteUtils.animationArray(animStart, animStart + 4), 2, true);
            this.play("wave");
            state.groups.water.add(this);
        }
    }

    export class RegularWater extends Water {
        constructor(state: Main, x: number, y: number) {
            super(state, x, y, 0);
            this.collisionCheck = function (a, b) {
                return true;
            };
        }
    }

    export class WaterEdge extends Water {

        constructor(state: Main, x: number, y: number, direction: Diagonals) {
            console.log(direction);
            super(state, x, y, (direction.valueOf() + 1) * 5);
            this.collisionCheck = function (a, b) {
                return true;
            }
        }
    }
}