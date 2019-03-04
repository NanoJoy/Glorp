module MyGame {
    const TILE_DISTANCE = 2;

    export abstract class Droppable implements Holdable {
        main: Main;
        startPosition: Phaser.Point;
        worldKey: string;
        inUse: boolean;
        abstract iconKey: string;

        constructor(main: Main, startPosition: Phaser.Point, worldKey: string) {
            this.main = main;
            this.startPosition = startPosition.clone();
            this.worldKey = worldKey;
            this.inUse = false;
        }

        drop(): number {
            let player = this.main.player;
            let rounded = Utils.roundToClosestTile(player.position);
            let x = player.direction === Direction.Left ? rounded.x - TILE_DISTANCE : player.direction === Direction.Right ? rounded.x + TILE_DISTANCE : rounded.x;
            let betweenX = player.direction === Direction.Left ? rounded.x - 1 : player.direction === Direction.Right ? rounded.x + 1 : rounded.x;
            let y = player.direction === Direction.Up ? rounded.y - TILE_DISTANCE : player.direction === Direction.Down ? rounded.y + TILE_DISTANCE : rounded.y;
            let betweenY = player.direction === Direction.Up ? rounded.y - 1 : player.direction === Direction.Down ? rounded.y + 1 : rounded.y;
            if (Utils.tileisClear(x, y, this.main) && Utils.tileisClear(betweenX, betweenY, this.main)) {
                this.main.addItem(x, y, this.worldKey);
                return 1;
            }
            return 0;
        }

        use(direction: Direction): number {
            return this.drop();
        }

        update(): void { }
    }


    export class Grodule extends Droppable {
        iconKey = Assets.Images.GroduleIcon;

        constructor(main: Main, x: number, y: number) {
            super(main, pof(x, y), Assets.Sprites.Grodule.key);
        }
    }

    export class Airhorn extends Droppable {
        iconKey = Assets.Images.AirhornIcon;

        private direction: Direction;
        private xAdd: number;
        private yAdd: number;
        private image: Phaser.Image;

        constructor(main: Main, x: number, y: number) {
            super(main, pof(x, y), Assets.Sprites.Airhorn.key);
            this.image = main.add.image(0, 0, this.worldKey);
            this.image.animations.add("blow", Utils.animationArray(1, 2), 10, true);
            this.image.visible = false;
        }

        use(direction: Direction): number {
            if (this.image.visible) {
                return 0;
            }
            this.image.visible = true;
            this.setPosition(this.main.player, direction);
            this.main.sound.play(Assets.Audio.Airhorn.key);
            this.image.play("blow");
            this.inUse = true;
            this.main.time.events.add(1500, () => { 
                this.image.visible = false;
                this.inUse = false;
            });
            this.main.time.events.start();
            return 0;
        }

        update(): void {
            this.setPosition(this.main.player, this.main.player.direction);
        }

        private setPosition(player: Player, direction: Direction) {
            if (direction !== this.direction) {
                this.xAdd = direction === Direction.Right ? TILE_WIDTH : 0;
                this.yAdd = direction === Direction.Down ? TILE_HEIGHT : direction === Direction.Up ? -TILE_HEIGHT : 0;
                this.image.scale.x = direction === Direction.Left ? -1 : 1;
            }
            this.direction = direction;
            this.image.position.setTo(player.x + this.xAdd, player.y + this.yAdd);
        }
    }
}