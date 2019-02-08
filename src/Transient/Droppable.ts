module MyGame {
    const TILE_DISTANCE = 2;

    export abstract class Droppable implements Holdable {
        main: Main;
        startPosition: Phaser.Point;
        worldKey: string;
        abstract iconKey: string;

        constructor(main: Main, startPosition: Phaser.Point, worldKey: string) {
            this.main = main;
            this.startPosition = startPosition.clone();
            this.worldKey = worldKey;
        }

        drop(): number {
            let player = this.main.player;
            let rounded = Utils.roundToClosestTile(player.position);
            let x = player.direction === Direction.Left ? rounded.x - TILE_DISTANCE : player.direction === Direction.Right ? rounded.x + TILE_DISTANCE : rounded.x;
            let y = player.direction === Direction.Up ? rounded.y - TILE_DISTANCE : player.direction === Direction.Down ? rounded.y + TILE_DISTANCE : rounded.y;
            if (Utils.tileisClear(x, y, this.main)) {
                this.main.addItem(x, y, this.worldKey);
                return 1;
            }
            return 0;
        }

        use(direction: Direction): number {
            return this.drop();
        }
    }

    export class Grodule extends Droppable {
        iconKey = Assets.Images.GroduleIcon;

        constructor(main: Main, x: number, y: number) {
            super(main, pof(x, y), Assets.Sprites.Grodule.key);
        }
    }

    export class Airhorn extends Droppable {
        iconKey = Assets.Images.AirhornIcon;

        private image: Phaser.Image;

        constructor(main: Main, x: number, y: number) {
            super(main, pof(x, y), Assets.Sprites.Airhorn.key);
            this.image = main.add.image(0, 0, this.worldKey);
            this.image.animations.add("blow", Utils.animationArray(1, 2), 10, true);
            this.image.visible = false;
        }

        use(direction: Direction): number {
            this.image.visible = true;
            let xAdd = direction === Direction.Right ? TILE_WIDTH : direction === Direction.Left ? -TILE_WIDTH : 0;
            let yAdd = direction === Direction.Down ? TILE_HEIGHT : direction === Direction.Up ? -TILE_HEIGHT : 0;
            this.image.position.setTo(this.main.player.x + xAdd, this.main.player.y + yAdd);
            this.image.scale.x = direction === Direction.Left ? -1 : 1;
            this.image.play("blow");
            this.main.time.events.add(2000, () => { this.image.visible = false; });
            return 0;
        }
    }
}