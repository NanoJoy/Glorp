module MyGame {
    export class BottomTextDisplay implements TextDisplay {
        game: Main;
        sprite: Phaser.Sprite;
        optionsBackground: Phaser.Sprite;
        name: string;
        firstPage: TextPage;
        currentPage: TextPage;
        pageNumber: number;
        isDisplaying: boolean;
        text: Phaser.BitmapText;
        readonly spriteHeight = 80;
        readonly fontStyle = { font: "14px okeydokey", fill: "#000000" };

        constructor(game: Main, name: string) {
            this.game = game;
            this.name = name;
            this.firstPage = getDialogue(name);
            this.currentPage = this.firstPage;
        }

        scrollPage(direction: Direction) {
            switch(direction) {
                case Direction.Up:
                    this.scrollUp();
                    break;
                case Direction.Down:
                    this.scrollDown();
            }
        }

        scrollUp() {
            if (this.pageNumber > 0) {
                this.pageNumber -= 1;
                this.text.text = this.currentPage.text[this.pageNumber];
                console.log("scrollUp");
            }
        }

        scrollDown() {
            if (this.pageNumber < this.currentPage.text.length - 1) {
                this.pageNumber += 1;
                this.text.text = this.currentPage.text[this.pageNumber];
                console.log("scrollDown");
            }
        }

        start() {
            this.game.physics.arcade.isPaused = true;

            this.sprite = this.game.add.sprite(0, 0, "bottom_text_background");
            this.text = this.game.add.bitmapText(8, this.sprite.y + 8, "testbitmap", this.firstPage.text[0], 14);
            this.text.maxWidth = Constants.SCREEN_WIDTH - 16;
            this.pageNumber = 0;
            this.isDisplaying = true;

            this.game.inputs.down.onUp.add(this.scrollDown, this);
            this.game.inputs.up.onUp.add(this.scrollUp, this)
        }
    }
}