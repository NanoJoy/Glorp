module MyGame {
    export class BottomTextDisplay implements TextDisplay {
        game: Main;
        textBackground: Phaser.Image;
        optionsBackground: Phaser.Image;
        upArrow: Phaser.Image;
        downArrow: Phaser.Image;
        name: string;
        firstPage: TextPage;
        currentPage: TextPage;
        pageNumber: number;
        isDisplaying: boolean;
        text: Phaser.BitmapText;

        options: TextOption[];
        currentOption: number;
        currentOptionText: Phaser.BitmapText;
        leftArrow: Phaser.Image;
        rightArrow: Phaser.Image;

        readonly spriteHeight = 80;
        readonly fontStyle = { font: "14px okeydokey", fill: "#000000" };

        constructor(game: Main, name: string) {
            this.game = game;
            this.name = name;
            this.firstPage = Dialogs[name];
            this.currentPage = this.firstPage;
        }

        scrollPage(direction: Direction) {
            switch(direction) {
                case Direction.Up:
                    this.scrollUp();
                    break;
                case Direction.Down:
                    this.scrollDown();
                    break;
                case Direction.Right:
                    this.scrollRight();
                    break;
                case Direction.Left:
                    this.scrollLeft();
            }
        }

        scrollUp() {
            if (this.upArrow.visible) {
                this.pageNumber -= 1;
                this.text.text = this.currentPage.text[this.pageNumber];
                this.downArrow.visible = true;
                this.upArrow.visible = this.pageNumber > 0;
            }
        }

        scrollDown() {
            if (this.downArrow.visible) {
                this.pageNumber += 1;
                this.text.text = this.currentPage.text[this.pageNumber];
                this.upArrow.visible = true;
                this.downArrow.visible = this.pageNumber < this.currentPage.text.length - 1;
            }
        }

        scrollRight() {
            if (this.rightArrow.visible) {
                this.currentOption += 1;
                this.currentOptionText.text = this.options[this.currentOption].text;
                this.leftArrow.visible = true;
                this.rightArrow.visible = this.currentOption < this.options.length - 1;
            }
        }

        scrollLeft() {
            if (this.leftArrow.visible) {
                this.currentOption -= 1;
                this.currentOptionText.text = this.options[this.currentOption].text;
                this.rightArrow.visible = true;
                this.leftArrow.visible = this.currentOption > 0;
            }
        }

        makeChoice() {
            var textPrompt = this.currentPage as TextPrompt;
            var next = textPrompt.getNext(this.currentOption);
            if (next == null) {
                this.textBackground.destroy();
                this.text.destroy();
                this.optionsBackground.destroy();
                this.currentOptionText.destroy();
                this.game.physics.arcade.isPaused = false;
                this.game.textOnScreen = false;
                
                if (this.currentPage.onFinish != undefined) {
                    this.currentPage.onFinish(this.currentOption);
                }
                return;
            }
            if (!next.hasOptions) {
                this.optionsBackground.destroy();
                this.currentOptionText.destroy();
                this.rightArrow.destroy();
                this.leftArrow.destroy();
                this.options = null;
                this.game.inputs.right.onUp.removeAll();
                this.game.inputs.left.onUp.removeAll();
                this.currentPage = next;
                this.text.text = next.text[0];
                this.pageNumber = 0;
                this.upArrow.visible = false;
                this.downArrow.visible = this.currentPage.text.length > 1;
                this.game.inputs.O.onUp.removeAll();
                this.game.inputs.O.onUp.add(this.endDump, this);
                return;
            }
            this.currentPage = next;
            this.options = (next as TextPrompt).options;
            this.currentOption = 0;
            this.pageNumber = 0;
            this.currentOptionText.text = this.options[0].text;
            this.text.text = next.text[0];
            this.upArrow.visible = false;
            this.downArrow.visible = this.firstPage.text.length > 1;
            this.leftArrow.visible = false;
            this.rightArrow.visible = textPrompt.options.length > 0;
        }

        endDump() {
            this.textBackground.destroy();
            this.text.destroy();
            this.game.physics.arcade.isPaused = false;
            this.game.textOnScreen = false;
            
            if (this.currentPage.onFinish != undefined) {
                this.currentPage.onFinish(this.currentOption);
            }
        }

        start() {
            this.game.physics.arcade.isPaused = true;
            this.game.textOnScreen = true;

            this.textBackground = this.game.add.image(0, 0, Assets.Images.BottomTextBackground);
            this.upArrow = this.game.add.image(Constants.SCREEN_WIDTH - 22, 8, Assets.Sprites.Arrow.key, 0);
            this.upArrow.visible = false;
            this.downArrow = this.game.add.image(Constants.SCREEN_WIDTH - 22, this.textBackground.height - 20, Assets.Sprites.Arrow.key, 1);
            this.downArrow.visible = this.firstPage.text.length > 1;

            this.text = this.game.add.bitmapText(8, this.textBackground.y + 8, Assets.FontName, this.firstPage.text[0], 14);
            this.text.maxWidth = Constants.SCREEN_WIDTH - 24;
            this.pageNumber = 0;
            this.isDisplaying = true;
            
            this.game.inputs.down.onUp.add(this.scrollDown, this);
            this.game.inputs.up.onUp.add(this.scrollUp, this);

            if (this.firstPage.hasOptions) {
                var textPrompt = this.currentPage as TextPrompt;
                this.currentOption = 0;
                this.optionsBackground = this.game.add.image(0, this.textBackground.height, Assets.Images.OptionsBackground);
                this.leftArrow = this.game.add.image(6, this.textBackground.height + 12, Assets.Sprites.Arrow.key, 3);
                this.leftArrow.visible = false;
                this.rightArrow = this.game.add.image(Constants.SCREEN_WIDTH - 18, this.textBackground.height + 12, Assets.Sprites.Arrow.key, 2);
                this.rightArrow.visible = textPrompt.options.length > 0;

                this.currentOptionText = this.game.add.bitmapText(18, this.optionsBackground.y + 8, Assets.FontName, textPrompt.options[0].text, 14);
                this.options = textPrompt.options;
                this.game.inputs.left.onUp.add(this.scrollLeft, this);
                this.game.inputs.right.onUp.add(this.scrollRight, this);

                this.game.inputs.O.onUp.add(this.makeChoice, this);
            } else {
                this.game.inputs.O.onUp.add(this.endDump, this);
            }
        }
    }
}