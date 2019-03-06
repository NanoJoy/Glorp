module MyGame {
    export class MainMenu extends Phaser.State {
        private title: Phaser.Image;
        private artwork: Phaser.Sprite;
        private directions: Phaser.BitmapText;
        private inputs: Inputs;

        create() {

            this.stage.backgroundColor = Colors.GRAY;
            this.title = this.add.image(0, 50, Assets.Images.Title);
            Utils.centerImage(this.title, true, false);

            this.artwork = this.add.sprite(0, 0, Assets.Sprites.Blumpus.key, 0);
            Utils.centerImage(this.artwork);
            this.artwork.animations.add("sleep", [0, 1], 2, true);
            this.artwork.animations.play("sleep");

            this.directions = this.add.bitmapText(0, 0, Assets.FontName, "SPACEBAR: new game\n   SHIFT: load game", Assets.FontSize);
            Utils.centerInScreen(this.directions);
            this.directions.y = SCREEN_HEIGHT - 100;

            this.inputs = new Inputs(this);
            this.inputs.spacebar.onUp.add(this.startGame, this, 0, false);
            this.inputs.shift.onUp.add(this.startGame, this, 0, true);
        }

        startGame(useSave: boolean) {
            StateTransfer.getInstance().flags["USE_SAVE"] = useSave;
            let tween = this.add.tween(this.world).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(function () {
                this.state.start(States.Main);
            }, this);
        }
    }
}