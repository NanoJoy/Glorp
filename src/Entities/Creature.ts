module MyGame {


    export abstract class Creature implements Entity {
        readonly MOVE = "move";

        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Image;
        type: string;
        uniqueUpdate: () => void;
        
        constructor(main: Main, position: Phaser.Point, spriteKey: string) {
            this.main = main;
            this.position = position.clone();
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, spriteKey);
            this.sprite.animations.add(this.MOVE, null, 10, true);
            this.main.physics.arcade.enable(this.sprite);
            this.sprite.play(this.MOVE);
        }

        update() {
            let barriers = this.main.groups.barriers.map(b => b.sprite);
            this.main.physics.arcade.collide(this.sprite, barriers);
            this.uniqueUpdate();
        }
    }

    export class Blish extends Creature {
        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Blish.key);
            this.type = Assets.Sprites.Blish.key;
            main.groups.barriers.push(new Water(main, position));

            this.uniqueUpdate = () => {};
        }
    }
}