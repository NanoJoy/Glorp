module MyGame {


    export abstract class Creature implements Entity {
        readonly MOVE = "move";

        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Sprite;
        type: string;
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
            let barriers = this.main.groups.barriers.map(b => b.sprite);
            //this.main.physics.arcade.collide(this.sprite, barriers);
            this.uniqueUpdate();
        }
    }

    export class Blish extends Creature {
        private static MAX_SPEED: 200;
        private static ACCELERATION: 5;

        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Blish.key);
            this.type = Assets.Sprites.Blish.key;
            main.groups.barriers.push(new Water(main, position));
            console.log(this.sprite.body);

            this.uniqueUpdate = () => {
                let target = Utils.roundToClosestTile(this.main.player.position);
                this.sprite.body.velocity.x = Utils.accelerateToTarget(target.x, this.sprite.x, this.sprite.body.velocity.x, Blish.ACCELERATION, Blish.MAX_SPEED);
                this.sprite.body.velocity.y = Utils.accelerateToTarget(target.y, this.sprite.y, this.sprite.body.velocity.y, Blish.ACCELERATION, Blish.MAX_SPEED);
            };
        }
    }
}