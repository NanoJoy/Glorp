module MyGame {

    export abstract class Source extends Barrier {
        renewing: boolean;
        amount: number;
        type: string;
        sound: Phaser.Sound;

        constructor(type: string, main: Main, x: number, y: number, renewing: boolean, amount: number, typeAsSource = false) {
            let sourceKey = typeAsSource ? type : type + "_" + SOURCE;
            super(main, pof(x, y), sourceKey, "s", true);
            this.type = type;
            this.renewing = renewing;
            this.amount = amount;
            this.sound = main.add.sound(Assets.Audio.Collide.key);

            this.onCollision = (playerSprite: Phaser.Sprite, barrierSprite: Phaser.Sprite) => {
                if (this.main.player.itemManager.getCount() > 0 && !(this.main.player.itemManager.getCurrentType() === this.type && amount > 1)) {
                    if (!this.sound.isPlaying) {
                        this.sound.play();
                    }
                    this.main.projectileDisplay.flash();
                    return;
                }
                let stateTransfer = StateTransfer.getInstance();
                this.main.player.itemManager.changeItem(this.type, this.amount);
                this.main.projectileDisplay.updateCount(this.amount);
                this.main.projectileDisplay.updateIcon(this.type + "_" + ICON);
                stateTransfer.heldItems = { type: this.type, amount: this.amount };

                if (!this.renewing) {
                    this.remove();
                }
            }
        }

        remove() {
            let stateTransfer = StateTransfer.getInstance();
            this.sprite.destroy();
            this.main.groups.barriers = this.main.groups.barriers.filter(b => b !== this);
            stateTransfer.addedItems = stateTransfer.addedItems.filter(i => !i.location.equals(new Location(this.main.island.num, this.position.x, this.position.y)));
            WorldManager.getInstance().changeLayout(this.main.island.num, this.position, " ");
        }

        static makeSource(main: Main, x: number, y: number, type: string): Source {
            switch (type) {
                case Assets.Images.CrumbsSource:
                    return new CrumbSource(main, x, y);
                case Assets.Sprites.Airhorn.key:
                    return new SingleSource(main, x, y, type, false);
                case Assets.Sprites.Grodule.key:
                case Assets.Sprites.Plorpus.key:
                    return new SingleSource(main, x, y, type, true);
                case Assets.Images.Batteries:
                    return new BatteriesSource(main, x, y);
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

    export class BatteriesSource extends SingleSource {
        constructor(main: Main, x: number, y: number) {
            super(main, x, y, Assets.Images.Batteries, false);
            let instruments = this.main.groups.creatures.filter(c => c instanceof Instrument).map(c => c as Instrument);
            for (let instrument of instruments) {
                this.main.physics.arcade.overlap(this.sprite, instrument.sprite, (sp1: Phaser.Sprite, sp2: Phaser.Sprite) => {
                    instrument.receiveBatteries(this);
                })
            }
        }
    }
}