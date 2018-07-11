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
            this.buttonPrompt = new ButtonPrompt(this, main.inputs.O);
        }

        update() {
            this.main.physics.arcade.overlap(this.sprite, this.main.player, this.playerOverlap, null, this);
        }

        playerOverlap(signSprite: Phaser.Sprite, playerSprite: Phaser.Sprite) {
            console.log("hi");
            if (!this.buttonPrompt.displayed) {
                this.buttonPrompt.show();
            }
            if (this.buttonPrompt.buttonIsDown()) {
                this.textDisplay.start();
            }
        }
    }
}