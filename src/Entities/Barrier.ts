module MyGame {
    export abstract class Barrier implements Entity {
        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Sprite;

        onCollision: (playerSprite: Phaser.Sprite, barrierSprite: Phaser.Sprite) => void;

        constructor(main: Main, position: Phaser.Point, key: string) {
            this.main = main;
            this.position = position;
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, key);
            main.physics.arcade.enable(this.sprite);
            this.sprite.body.moves = false;
            this.sprite.body.immovable = true;
        }
    }

    export class Blackness extends Barrier {
        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Blackness.key);
        }
    }

    export class Water extends Barrier {
        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Water.key);
            this.sprite.animations.add("wave", Utils.animationArray(0, 4), 2, true);
            this.sprite.play("wave");
        }
    }

    export class StoneWall extends Barrier {
        static frames = [
            "wnnw", "nnnw", "wnnn", "nnnn",
            "nnwn", "nwnn", "nwwn", "nnww",
            "nwnw", "wnwn", "wwnn", "nnnw",
            "wwnw", "wnww", "nwww", "wwww"
        ];

        constructor(main: Main, position: Phaser.Point, neighborhood: Neighborhood) {
            super(main, position, Assets.Sprites.StoneWall.key);
            let frameString = "";
            frameString += neighborhood.above === "w" ? "w" : "n";
            frameString += neighborhood.left === "w" ? "w" : "n";
            frameString += neighborhood.right === "w" ? "w" : "n";
            frameString += neighborhood.below === "w" ? "w" : "n";
            this.sprite.frame = StoneWall.frames.indexOf(frameString);
        }
    }
}