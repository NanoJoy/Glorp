module MyGame {
    export class ProjectileDisplay {
        main: Main;
        background: Phaser.Image;
        icon: Phaser.Image;
        text: Phaser.BitmapText;

        constructor(main: Main, iconKey: string, startingCount = 0) {
            this.main = main;
            this.background = main.add.image(SCREEN_WIDTH - 56 - 4, 4, Assets.Images.ProjectileDisplay);
            this.icon = main.add.image(this.background.x + 28 + 6, this.background.y + 6, iconKey);
            this.text = main.add.bitmapText(this.background.x + 6, this.background.y + 6, Assets.FontName, startingCount.toString(), 14);
            this.background.fixedToCamera = true;
            this.icon.fixedToCamera = true;
            this.text.fixedToCamera = true;
            this.updateCount(startingCount);
        }

        updateCount(num: number) {
            this.text.text = num.toString();
            this.text.x = this.background.x + 28 - (this.text.width / 2);
            this.text.y = this.background.y + 28 - (this.text.height / 2);
        }

        bringToTop() {
            this.main.world.bringToTop(this.background);
            this.main.world.bringToTop(this.icon);
            this.main.world.bringToTop(this.text);
        }
    }
}