module MyGame {
    export class BottomTextDisplay implements TextDisplay {
        game: Phaser.Game;
        sprite: Phaser.Sprite;
        name: string;
        firstPage: TextPage;
        currentPage: TextPage;
        isDisplaying: boolean;
        text: Phaser.Text;
        readonly spriteHeight = 80;
        readonly fontStyle = { font: "14px okeydokey", fill: "#000000" };

        constructor(game: Phaser.Game, name: string) {
            this.game = game;
            this.name = name;
            this.firstPage = getDialogue(name);
            this.currentPage = this.firstPage;
        }

        scrollPage: (direction: Direction) => void;

        start() {
            this.sprite = this.game.add.sprite(0, Constants.SCREEN_HEIGHT - this.spriteHeight, "bottom_text_background");
            this.text = this.game.add.text(8, Constants.SCREEN_HEIGHT - this.spriteHeight + 6, this.firstPage.text, this.fontStyle);
            this.text.smoothed = false;
            this.isDisplaying = true;
        }
    }
}