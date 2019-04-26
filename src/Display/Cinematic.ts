module MyGame {
    export class CinematicBars implements Display {
        main: Main;
        top: Phaser.Image;
        bottom: Phaser.Image;

        constructor(main: Main) {
            this.main = main;
            this.top = main.add.image(main.camera.x, main.camera.y, Assets.Images.Bar);
            this.top.scale.y = .75;
            this.bottom = main.add.image(main.camera.x, main.camera.y + SCREEN_HEIGHT - 75, Assets.Images.Bar);
            this.bottom.scale.y = .75;
            this.top.fixedToCamera = true;
            this.bottom.fixedToCamera = true;
        }

        bringToTop() {
            this.main.world.bringToTop(this.top);
            this.main.world.bringToTop(this.bottom);
        }

        hide() {
            this.top.visible = false;
            this.bottom.visible = false;
        }

        show() {
            this.top.visible = true;
            this.bottom.visible = true;
        }
    }
}