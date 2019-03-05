module MyGame {
    export class MainMenu extends Phaser.State {
        private title: Phaser.BitmapText;
        private artwork: Phaser.Sprite;
        private directions: Phaser.BitmapText;

        create() {
            this.title = this.add.bitmapText(0, 0, Assets.FontName, "Creature Dance", Assets.FontSize * 2);
            Utils.centerInScreen(this.title);
            this.title.y = 36;

            this.artwork = this.add.sprite(SCREEN_WIDTH - (Assets.Sprites.Blumpus.width / 2), SCREEN_HEIGHT - (Assets.Sprites.Blumpus.height / 2), Assets.Sprites.Blumpus.key, 0);
            this.artwork.animations.add("sleep", [0, 1], 2, true);
            this.artwork.animations.play("sleep");

            this.directions = this.add.bitmapText(0, 0, Assets.FontName, "Press SPACEBAR to start new game\nPress SHIFT to load game", Assets.FontSize);
            Utils.centerInScreen(this.directions);
            this.directions.y = SCREEN_HEIGHT - 36;
        }
    }
}