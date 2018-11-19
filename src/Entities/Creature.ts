module MyGame {


    export abstract class Creature implements Entity {
        readonly MOVE = "move";

        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Sprite;
        type: string;
        barriers: Phaser.Sprite[];
        uniqueUpdate: () => void;
        
        constructor(main: Main, position: Phaser.Point, spriteKey: string, collidesWith?: string[]) {
            this.main = main;
            this.position = position.clone();
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, spriteKey);
            this.sprite.animations.add(this.MOVE, null, 10, true);
            this.main.physics.arcade.enableBody(this.sprite);
            this.sprite.play(this.MOVE);
            if (collidesWith !== undefined) {
                this.barriers = this.main.groups.barriers
                    .filter(b => collidesWith.indexOf(b.sprite.key as string) !== -1)
                    .map(b => b.sprite);
            } else {
                this.barriers = this.main.groups.barriers.map(b => b.sprite);
            }

        }

        update() {
            this.main.physics.arcade.collide(this.sprite, this.barriers);
            this.uniqueUpdate();
        }
    }

    export class Blish extends Creature {
        private static MAX_SPEED = 100;
        private static CUTOFF = 2;
        
        leftSides: Phaser.Line[];
        topSides: Phaser.Line[];

        constructor(main: Main, position: Phaser.Point) {
            debugger;
            super(main, position, Assets.Sprites.Blish.key, [Assets.Images.Lillypad]);
            this.type = Assets.Sprites.Blish.key;
            main.groups.barriers.push(new Water(main, position));
            this.sprite.body.velocity.setTo(0, 0);
            this.leftSides = this.barriers.map(b => new Phaser.Line(b.left, b.top, b.left, b.bottom));
            this.topSides = this.barriers.map(b => new Phaser.Line(b.left, b.top, b.right, b.top));

            this.uniqueUpdate = () => {
                Utils.moveToTarget(this.sprite.body, this.main.player.position, Blish.MAX_SPEED, Blish.CUTOFF, Infinity, this.leftSides, this.topSides);
            };
        }
    }
}