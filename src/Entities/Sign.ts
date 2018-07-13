module MyGame {
    export class Sign implements Entity {
        main: Main;
        sprite: Phaser.Sprite;
        position: Phaser.Point;
        textDisplay: BottomTextDisplay;
        buttonPrompt: ButtonPrompt;

        constructor (main: Main, position: Phaser.Point, textKey: string) {
            this.main = main;
            this.position = position;
            this.sprite = main.add.sprite(position.x * TILE_WIDTH, position.y * TILE_HEIGHT, Assets.Images.Sign);
            main.physics.arcade.enable(this.sprite);
            this.sprite.body.moves = false;
            this.sprite.body.immovable = true;
            this.textDisplay = new BottomTextDisplay(main, textKey);
            this.buttonPrompt = new ButtonPrompt(this, main.inputs.O, -4);
        }

        update() {
            var overlapping = false;
            this.main.physics.arcade.overlap(this.sprite, this.main.player, function (s: Phaser.Sprite, p: Phaser.Sprite) {
                overlapping = true;
            }, null, this);
            if (overlapping) {
                if (!this.buttonPrompt.displayed) {
                    this.buttonPrompt.show();
                }
                if (this.buttonPrompt.buttonIsDown()) {
                    this.textDisplay.start();
                }
            } else {
                if (this.buttonPrompt.displayed) {
                    this.buttonPrompt.hide();
                }
            }
        }
    }
}