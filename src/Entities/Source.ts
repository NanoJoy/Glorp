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
                let stateTransfer = StateTransfer.getInstance();
                this.main.player.itemManager.changeItem(this.type, this.amount);
                this.main.projectileDisplay.updateCount(this.amount);
                this.main.projectileDisplay.updateIcon(this.type + "_" + ICON);
                stateTransfer.heldItems = { type: this.type, amount: this.amount };

                if (!this.renewing) {
                    this.sprite.destroy();
                    this.main.groups.barriers = this.main.groups.barriers.filter(b => b !== this);
                    stateTransfer.addedItems = stateTransfer.addedItems.filter(i => !i.location.equals(new Location(this.main.island.num, this.position.x, this.position.y)));
                    WorldManager.getInstance().changeLayout(this.main.island.num, this.position, " ");
                }
            }
        }

        static makeSource(main: Main, x: number, y: number, type: string): Source {
            switch (type) {
                case Assets.Images.CrumbsSource:
                    return new CrumbSource(main, x, y);
                case Assets.Sprites.Airhorn.key:
                    return new SingleSource(main, x, y, type, false);
                case Assets.Sprites.Grodule.key:
                    return new SingleSource(main, x, y, type, true);
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
        constructor(main: Main, x: number, y: number, key: string, animate = true) {
            super(key, main, x, y, false, 1, true);
            if (animate) {
                this.sprite.animations.add("anim", null, 5, true);
                this.sprite.play("anim");
            }
        }
    }
}