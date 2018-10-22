module MyGame {
    export abstract class Barrier implements Entity {
        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Sprite;
        hasBody: boolean;

        onCollision: (playerSprite: Phaser.Sprite, barrierSprite: Phaser.Sprite) => void;

        constructor(main: Main, position: Phaser.Point, key: string, char: string) {
            this.main = main;
            this.position = position;
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, key);
            if (!Utils.surroundedByChar(main.island.layout, position.x, position.y, char)) {
                main.physics.arcade.enable(this.sprite);
                this.sprite.body.moves = false;
                this.sprite.body.immovable = true;
                this.hasBody = true;
            } else {
                this.hasBody = false;
            }
        }
    }

    export class Blackness extends Barrier {
        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Blackness.key, "b");
        }
    }

    export class Water extends Barrier {
        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Water.key, "o");
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
            super(main, position, Assets.Sprites.StoneWall.key, "w");
            let frameString = "";
            frameString += neighborhood.above === "w" ? "w" : "n";
            frameString += neighborhood.left === "w" ? "w" : "n";
            frameString += neighborhood.right === "w" ? "w" : "n";
            frameString += neighborhood.below === "w" ? "w" : "n";
            this.sprite.frame = StoneWall.frames.indexOf(frameString);
        }
    }

    export class Tree extends Barrier {
        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Tree.key, "t");
            this.sprite.body.setSize(Assets.Sprites.Tree.width, Assets.Sprites.Tree.height * 0.5, 0, Assets.Sprites.Tree.height * 0.5);
        }
    }

    export class Bush extends Barrier {
        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.Bush.key, "*");
            let row = main.island.layout[position.y];
            let connectLeft = position.x === 0 || row[position.x - 1] === "*";
            let connectRight = position.x === row.length - 1 || row[position.x + 1] === "*";
            if (connectLeft) {
                if (connectRight) {
                    this.sprite.frame = 2;
                } else {
                    this.sprite.frame = 3;
                }
            } else if (connectRight) {
                this.sprite.frame = 1;
            } else {
                this.sprite.frame = 0;
            }
        }
    }

    export class Gate extends Barrier {
        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Images.Gate, "g");
        }
    }
}