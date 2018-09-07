module MyGame {
    export class Trigger {
        main: Main;
        area: Phaser.Sprite;
        active: boolean;
        action: (main: Main, trigger: Trigger) => void;
        
        constructor(main: Main, x: number, y: number, width: number, height: number, 
            action: (main: Main, trigger: Trigger) => void) {
            this.main = main;
            this.area = main.add.sprite(x * TILE_WIDTH, y * TILE_HEIGHT, null);
            main.physics.arcade.enable(this.area);
            this.area.body.setSize(width * TILE_WIDTH, height * TILE_HEIGHT, 0, 0);
            this.action = action;
            this.active = true;
        }

        checkPlayerOverlap() {
            if (!this.active) {
                return;
            }
            this.main.physics.arcade.overlap(this.area, this.main.player, this.performAction, null, this);
        }

        performAction() {
            this.action(this.main, this);
            this.active = false;
        }
    }
}