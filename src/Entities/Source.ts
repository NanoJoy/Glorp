module MyGame {

    export abstract class Source extends Barrier {

        renewing: boolean;
        amount: number;
        type: string;

        constructor(type: string, main: Main, x: number, y: number, renewing: boolean, amount: number) {
            super(main, pof(x, y), type + "_" + SOURCE, "s", true);
            this.type = type;
            this.renewing = renewing;
            this.amount = amount;

            this.onCollision = (playerSprite: Phaser.Sprite, barrierSprite: Phaser.Sprite) => {
                this.main.player.itemType = this.type;
                this.main.player.itemCount = this.amount;
                this.main.projectileDisplay.updateCount(this.amount);
                this.main.projectileDisplay.updateIcon(this.type + "_" + ICON);
            }
        }

        static makeSource(main: Main, x: number, y: number, type: string): Source {
            switch (type) {
                case Assets.Images.CrumbsSource:
                    return new CrumbSource(main, x, y);
            }
            throw new Error(`Source type ${type} is invalid.`);
        }
    }

    export class CrumbSource extends Source {
        constructor(main: Main, x: number, y: number) {
            super(Assets.Sprites.Crumbs.key, main, x, y, true, 10);
        }
    }
}