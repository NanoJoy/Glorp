module MyGame {


    export abstract class Creature implements Entity {
        readonly MOVE = "move";

        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Sprite;
        type: string;
        collidesWith: string[];
        uniqueUpdate: () => void;
        
        constructor(main: Main, position: Phaser.Point, spriteKey: string) {
            this.main = main;
            this.position = position.clone();
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, spriteKey);
            this.sprite.animations.add(this.MOVE, null, 10, true);
            this.main.physics.arcade.enableBody(this.sprite);
            this.sprite.play(this.MOVE);
        }

        update() {
            let barriers = this.main.groups.barriers;
            if (Utils.isAThing(this.collidesWith)) {
                barriers = barriers.filter(b => this.collidesWith.indexOf(b.sprite.key as string) !== -1);
            }
            let barrierSprites = barriers.map(b => b.sprite);
            this.main.physics.arcade.collide(this.sprite, barrierSprites);
            this.uniqueUpdate();
        }
    }

    export class Blish extends Creature {
        private static MAX_SPEED = 100;
        private static ACCELERATION = 5;

        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Blish.key);
            this.type = Assets.Sprites.Blish.key;
            main.groups.barriers.push(new Water(main, position));
            this.sprite.body.velocity.setTo(0, 0);
            this.collidesWith = [Assets.Images.Lillypad];

            this.uniqueUpdate = () => {
                let target = Utils.roundToClosestTile(this.main.player.position);
                Utils.moveToTarget(this.sprite.body, target, Blish.MAX_SPEED);
            };
        }
    }
}