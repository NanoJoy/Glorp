module MyGame {
    export abstract class Water extends Phaser.Sprite {

        collisionCheck: (player: Player, water: Phaser.Sprite) => boolean;

        collisionBehavior: (player: Phaser.Sprite, water: Phaser.Sprite) => void;

        constructor(state: Main, x: number, y: number, animStart: number) {
            super(state.game, x * TILE_WIDTH, y * TILE_HEIGHT, Assets.Sprites.Water.key);
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
            this.collisionCheck = function (player, water) {
                return true;
            };
            this.collisionBehavior = function (player, water) {};
        }
    }

    export class WaterEdge extends Water {

        triangle: Phaser.Polygon;
        playerPointToCheck: {
            x: string,
            y: string
        }

        constructor(state: Main, x: number, y: number, direction: Diagonal) {
            super(state, x, y, (direction.valueOf() + 1) * 5);
            switch (direction) {
                case Diagonal.NE:
                    this.triangle = new Phaser.Polygon([new Phaser.Point(this.left - 2, this.top - 2),
                    new Phaser.Point(this.right + 2, this.top - 2),
                    new Phaser.Point(this.right + 2, this.bottom + 2)]);
                    this.playerPointToCheck = { x: "right", y: "top" };
                    break;
                case Diagonal.NW:
                    this.triangle = new Phaser.Polygon([new Phaser.Point(this.right + 2, this.top - 2),
                    new Phaser.Point(this.left - 2, this.top - 2),
                    new Phaser.Point(this.left - 2, this.bottom + 2)]);
                    this.playerPointToCheck = { x: "left", y: "top" };                    
                    break;
                case Diagonal.SW:
                    this.triangle = new Phaser.Polygon([new Phaser.Point(this.left - 2, this.top - 2),
                    new Phaser.Point(this.right + 2, this.bottom + 2),
                    new Phaser.Point(this.left - 2, this.bottom + 2)]);
                    this.playerPointToCheck = { x: "left", y: "bottom" };                    
                    break;
                case Diagonal.SE:
                    this.triangle = new Phaser.Polygon([new Phaser.Point(this.right + 2, this.top - 2),
                    new Phaser.Point(this.right + 2, this.bottom),
                    new Phaser.Point(this.left - 2, this.bottom)]);
                    this.playerPointToCheck = { x: "right", y: "bottom" };                    
                    break;
            }

            this.collisionCheck = function (player, water) {var x = this.playerPointToCheck.x === "right" ? player.right : player.left;
                var y = this.playerPointToCheck.y === "top" ? player.top : player.bottom;
                return this.triangle.contains(x, y);
            };

            this.collisionBehavior = function (player, water) {
                var xMultiplier = this.playerPointToCheck.x === "right" ? -1 : 1;
                var yMultiplier = this.playerPointToCheck.y === "bottom" ? -1 : 1;
                if (player.body.velocity.y !== 0) {
                    player.y += yMultiplier * 1;
                }
                if (player.body.velocity.x !== 0) {
                    player.x += xMultiplier * 1;
                }
            };
        }
    }
}