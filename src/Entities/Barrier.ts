module MyGame {
    export abstract class Barrier implements Entity {
        main: Main;
        position: Phaser.Point;
        sprite: Phaser.Sprite;
        hasBody: boolean;
        playerCollides: boolean;
        island: number;
        char: string;

        onCollision(playerSprite: Phaser.Sprite, barrierSprite: Phaser.Sprite): void {}
        checkCollision(playerSprite: Phaser.Sprite, barrierSprite: Phaser.Sprite): boolean { return true; }
        onStageBuilt(): void {}

        constructor(main: Main, position: Phaser.Point, key: string, char: string, playerCollides = true) {
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
            this.playerCollides = playerCollides;
            this.island = main.island.num;
            this.char = char;
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

        onStageBuilt(): void {
            let bridges = this.main.groups.barriers.filter(b => b instanceof Bridge).map(b => b as Bridge);
            this.playerCollides = !Utils.firstOrDefault(bridges, b => b.position.equals(pof(this.position.x, this.position.y + 1)));
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
            super(main, position, Assets.Sprites.Gate.key, "g");
            if (main.island.layout[position.y - 1].charAt(position.x) === " ") {
                this.sprite.frame = Frames.Gate.HORIZONTAL;
            }
        }
    }

    export class Lillypad extends Barrier {
        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Images.Lillypad, "p");
        }
    }

    export class Path extends Barrier {
        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Images.Path, "#", false);
        }
    }

    export class CustomBarrier extends Barrier {
        constructor(main: Main, position: Phaser.Point, spriteKey: string, playerCollides: boolean) {
            super(main, position, spriteKey, "x", playerCollides);
        }
    }

    export class Bridge extends Barrier {
        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Images.Bridge, '|', false);
        }
    }

    export class TallGrass extends Barrier {
        constructor(main: Main, position: Phaser.Point) {
            super(main, position, Assets.Sprites.TallGrass.key, "v", false);
            this.sprite.frame = Math.floor(Math.random() * 3);
        }
    }
}