module MyGame {
    export class HealthBar implements Display {
        private main: Main;
        private group: Phaser.Group;
        private container: Phaser.Image;
        private bar: Phaser.Sprite;
        private health: number;

        constructor(main: Main, health: number) {
            this.main = main;
            this.group = main.add.group();
            this.container = main.add.sprite(SCREEN_WIDTH - 64 - 134, 4, Assets.Images.HealthBarContainer);
            this.container.fixedToCamera = true;
            this.group.add(this.container);
            let width = this.container.width - 4;
            let bmd = this.main.add.bitmapData(width, this.container.height - 4);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, width, this.container.height - 4);
            bmd.ctx.fillStyle = "#" + Colors.RED.toString(16);
            bmd.ctx.fill();
            let redBar = main.add.sprite(this.container.x + 2, this.container.y + 2, bmd);
            redBar.fixedToCamera = true;
            this.group.add(redBar);
            this.updateHealth(health);
            this.bringToTop();
            if (health === 100) {
                this.hide();
            }
        }

        bringToTop() {
            this.group.bringToTop(this.bar);
            this.group.bringToTop(this.container);
            this.main.world.bringToTop(this.group);
        }

        show() {
            this.group.visible = true;
        }

        hide() {
            this.group.visible = false;
        }

        updateHealth(health: number) {
            if (this.health === health) {
                return;
            }
            if (this.bar) {
                this.bar.destroy;
            }
            let width = Math.round((health / 100) * ((this.container.width - 4) / 2)) * 2;
            let bmd = this.main.add.bitmapData(width, this.container.height - 4);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, width, this.container.height - 4);
            bmd.ctx.fillStyle = "#" + Colors.PURPLE.toString(16);
            bmd.ctx.fill();
            this.bar = this.main.add.sprite(this.container.x + 2, this.container.y + 2, bmd);
            this.bar.fixedToCamera = true;
            this.group.add(this.bar);
            this.health = health;
        }
    }
}