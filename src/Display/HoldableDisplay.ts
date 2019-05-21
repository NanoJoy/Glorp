module MyGame {
    const WIDTH = 56;
    const PADDING = 4;
    const TEXT_PADDING = 6;

    export class HoldableDisplay implements Display {
        private main: Main;
        private background: Phaser.Image;
        private icon: Phaser.Image;
        private text: Phaser.BitmapText;
        private displayGroup: Phaser.Group;
        private showing: boolean;

        constructor(main: Main, iconKey?: string, startingCount = 0) {
            this.main = main;
            this.background = main.add.image(SCREEN_WIDTH - WIDTH - PADDING, PADDING, Assets.Sprites.ProjectileDisplay.key);
            this.text = main.add.bitmapText(this.background.x + TEXT_PADDING, this.background.y + TEXT_PADDING, Assets.FontName, startingCount.toString(), Assets.FontSize);
            this.icon = this.main.add.image(this.background.x + (WIDTH / 2) + TEXT_PADDING, this.background.y + TEXT_PADDING, iconKey);
            this.background.animations.add("flash", [0, 1, 0, 1, 0, 1, 0, 1, 0], 10, false);
            this.background.fixedToCamera = true;
            this.text.fixedToCamera = true;
            this.icon.fixedToCamera = true;
            this.displayGroup = main.add.group();
            this.displayGroup.addMultiple([this.background, this.icon, this.text]);
            this.updateCount(startingCount);
            this.showing = true;
            this.hide();
        }

        updateCount(num: number) {
            this.text.text = num.toString();
            this.text.x = this.background.x + 28 - (this.text.width / 2);
            this.text.y = this.background.y + 28 - (this.text.height / 2);
            if (num === 0) {
                this.hide();
            } else {
                this.show();
            }
        }

        updateIcon(key: string) {
            if (this.icon && this.icon.key !== key) {
                this.icon.loadTexture(key);
            }
        }

        bringToTop() {
            this.main.world.bringToTop(this.displayGroup);
            this.displayGroup.bringToTop(this.icon);
            this.displayGroup.bringToTop(this.text);
        }

        hide() {
            if (!this.showing) return;
            this.displayGroup.visible = false;
            this.showing = false;
        }


        show() {
            if (this.showing) return;
            this.displayGroup.visible = true;
            this.showing = true;
        }

        flash() {
            this.background.play("flash");
        }
    }
}