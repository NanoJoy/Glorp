module MyGame {
    export class ProjectileDisplay {
        main: Main;
        background: Phaser.Image;
        icon: Phaser.Image;
        text: Phaser.BitmapText;
        displayGroup: Phaser.Group;
        showing: boolean;

        constructor(main: Main, iconKey: string, startingCount = 0) {
            this.main = main;
            this.displayGroup = main.add.group();
            this.background = main.add.image(SCREEN_WIDTH - 56 - 4, 4, Assets.Images.ProjectileDisplay);
            this.icon = main.add.image(this.background.x + 28 + 6, this.background.y + 6, iconKey);
            this.text = main.add.bitmapText(this.background.x + 6, this.background.y + 6, Assets.FontName, startingCount.toString(), 14);
            this.displayGroup.addMultiple([this.background, this.icon, this.text]);
            this.background.fixedToCamera = true;
            this.icon.fixedToCamera = true;
            this.text.fixedToCamera = true;
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

        bringToTop() {
            this.main.world.bringToTop(this.displayGroup);
        }

        hide() {
            if (!this.showing) return;
            this.displayGroup.forEach(function (s: Phaser.Sprite) {
                s.visible = false;
            });
            this.showing = false;
        }


        show() {
            if (this.showing) return;
            this.displayGroup.forEach(function (s: Phaser.Sprite) {
                s.visible = true;
            });
            this.showing = true;
        }
    }
}