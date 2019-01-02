module MyGame {

    export abstract class Source extends Barrier {
        renewing: boolean;
        amount: number;
        type: string;

        constructor(type: string, main: Main, x: number, y: number, renewing: boolean, amount: number, typeAsSource = false) {
            let sourceKey = typeAsSource ? type : type + "_" + SOURCE;
            super(main, pof(x, y), sourceKey, "s", true);
            this.type = type;
            this.renewing = renewing;
            this.amount = amount;

            this.onCollision = (playerSprite: Phaser.Sprite, barrierSprite: Phaser.Sprite) => {
                this.main.player.itemType = this.type;
                this.main.player.itemCount = this.amount;
                this.main.projectileDisplay.updateCount(this.amount);
                this.main.projectileDisplay.updateIcon(this.type + "_" + ICON);

                if (!this.renewing) {
                    this.sprite.destroy();
                    this.main.groups.barriers = this.main.groups.barriers.filter(b => b !== this);
                }
            }
        }

        static makeSource(main: Main, x: number, y: number, type: string): Source {
            switch (type) {
                case Assets.Images.CrumbsSource:
                    return new CrumbSource(main, x, y);
                case Assets.Sprites.Grodule.key:
                    return new SingleSource(main, x, y, type);
            }
            throw new Error(`Source type ${type} is invalid.`);
        }
    }

    export class CrumbSource extends Source {
        constructor(main: Main, x: number, y: number) {
            super(Assets.Sprites.Crumbs.key, main, x, y, true, 10);
        }
    }

    export class SingleSource extends Source {
        constructor(main: Main, x: number, y: number, key: string) {
            super(key, main, x, y, false, 1, true);
            this.sprite.animations.add("anim", null, 5, true);
            this.sprite.play("anim");
        }
    }
}