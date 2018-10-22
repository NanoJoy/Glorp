module MyGame {
    export class BottomTextDisplay implements TextDisplay {
        game: Main;
        textBackground: Phaser.Image;
        optionsBackground: Phaser.Image;
        upArrow: Phaser.Image;
        downArrow: Phaser.Image;
        name: string;
        textEncounter: ITextEncounter;
        pageNumber: number;
        isDisplaying: boolean;
        text: Phaser.BitmapText;
        parent: Entity;
        options: TextOption[];
        currentOption: number;
        currentOptionText: Phaser.BitmapText;
        leftArrow: Phaser.Image;
        rightArrow: Phaser.Image;
        currentRead: Boolean;

        readonly spriteHeight = 80;
        readonly fontStyle = { font: "14px okeydokey", fill: "#000000" };

        constructor(game: Main, parent: Entity) {
            this.game = game;
            this.parent = parent;
            this.name = name;
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
                this.text.text = this.textEncounter.getCurrentPage().text[this.pageNumber];
                this.downArrow.visible = true;
                this.upArrow.visible = this.pageNumber > 0;
            }
        }

        scrollDown() {
            if (this.downArrow.visible) {
                this.pageNumber += 1;
                this.text.text = this.textEncounter.getCurrentPage().text[this.pageNumber];
                this.upArrow.visible = true;
                this.downArrow.visible = this.pageNumber < this.textEncounter.getCurrentPage().text.length - 1;
                this.currentRead = !this.downArrow.visible;
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
            if (!this.currentRead) {
                return;
            }
            var next = this.textEncounter.getResponse(this.currentOption);
            if (!next) {
                this.textBackground.destroy();
                this.text.destroy();
                if (this.optionsBackground) {
                    this.optionsBackground.destroy();
                    this.currentOptionText.destroy();
                }
                if (this.rightArrow) this.rightArrow.destroy();
                if (this.leftArrow) this.leftArrow.destroy();
                if (this.downArrow) this.downArrow.destroy();
                if (this.upArrow) this.upArrow.destroy();
                this.game.unstopPlayer();
                this.textEncounter.onFinish(this.game, this.parent);
                this.textEncounter.reset();
                this.game.inputs.O.onUp.remove(this.addOnDownListener, this);
                this.game.inputs.O.onUp.remove(this.makeChoice, this);
                this.game.inputs.down.onDown.remove(this.scrollDown, this);
                this.game.inputs.up.onDown.remove(this.scrollUp, this);
                this.game.inputs.O.onUp.addOnce(function () {this.isDisplaying  = false;}, this);
                return;
            }
            if (!next.hasOptions) {
                this.optionsBackground.visible = false;;
                this.currentOptionText.visible = false;
                this.rightArrow.visible = false;
                this.leftArrow.visible = false;
                this.options = null;
                this.game.inputs.right.onDown.remove(this.scrollRight, this);
                this.game.inputs.left.onDown.remove(this.scrollLeft, this);
                this.text.text = next.text[0];
                this.pageNumber = 0;
                this.upArrow.visible = false;
                this.downArrow.visible = this.textEncounter.getCurrentPage().text.length > 1;
                this.currentRead = !this.downArrow.visible;
                this.game.inputs.O.onUp.add(this.addOnDownListener, this);
                return;
            }
            let nextPrompt = (next as TextPrompt);
            this.options = nextPrompt.options;
            this.currentOption = 0;
            this.pageNumber = 0;
            this.currentOptionText.text = this.options[0].text;
            this.text.text = next.text[0];
            this.upArrow.visible = false;
            this.downArrow.visible = nextPrompt.text.length > 1;
            this.currentRead = !this.downArrow.visible;
            this.leftArrow.visible = false;
            this.rightArrow.visible = nextPrompt.options.length > 1;
            this.game.inputs.left.onDown.add(this.scrollLeft, this);
            this.game.inputs.right.onDown.add(this.scrollRight, this);
            this.currentOptionText.visible = true;
            this.optionsBackground.visible = true;
            
            this.game.inputs.O.onUp.add(this.addOnDownListener, this);
        }

        addOnDownListener() {
            this.game.inputs.O.onDown.add(this.makeChoice, this);
        }

        start(textEncounter: ITextEncounter) {
            if (this.isDisplaying) {
                return;
            }
            this.textEncounter = textEncounter;
            this.game.stopPlayer();

            this.textBackground = this.game.add.image(0, 0, Assets.Images.BottomTextBackground);
            this.upArrow = this.game.add.image(SCREEN_WIDTH - 22, 8, Assets.Sprites.Arrow.key, 0);
            this.textBackground.fixedToCamera = true;
            this.upArrow.visible = false;
            this.downArrow = this.game.add.image(SCREEN_WIDTH - 22, this.textBackground.height - 20, Assets.Sprites.Arrow.key, 1);
            this.downArrow.visible = this.textEncounter.getCurrentPage().text.length > 1;
            this.currentRead = !this.downArrow.visible;
            this.upArrow.fixedToCamera = true;
            this.downArrow.fixedToCamera = true;

            this.text = this.game.add.bitmapText(8, this.textBackground.y + 8, Assets.FontName, this.textEncounter.getCurrentPage().text[0], 14);
            this.text.maxWidth = SCREEN_WIDTH - 24;
            this.text.fixedToCamera = true;
            this.pageNumber = 0;
            this.isDisplaying = true;
            
            this.game.inputs.down.onDown.add(this.scrollDown, this);
            this.game.inputs.up.onDown.add(this.scrollUp, this);
            this.optionsBackground = this.game.add.image(0, this.textBackground.height, Assets.Images.OptionsBackground);
            this.optionsBackground.fixedToCamera = true;
            this.optionsBackground.visible = false;
            this.currentOptionText = this.game.add.bitmapText(18, this.optionsBackground.y + 8, Assets.FontName, "", 14);
            this.currentOptionText.fixedToCamera = true;
            this.currentOptionText.visible = false;
            this.leftArrow = this.game.add.image(6, this.textBackground.height + 12, Assets.Sprites.Arrow.key, 3);
            this.leftArrow.visible = false;
            this.leftArrow.fixedToCamera = true;
            this.rightArrow = this.game.add.image(SCREEN_WIDTH - 18, this.textBackground.height + 12, Assets.Sprites.Arrow.key, 2);
            this.rightArrow.visible = false
            this.rightArrow.fixedToCamera = true;
            this.game.inputs.O.onDown.add(this.makeChoice, this);
            if (this.textEncounter.getCurrentPage().hasOptions) {
                var textPrompt = this.textEncounter.getCurrentPage() as TextPrompt;
                this.currentOption = 0;
                this.optionsBackground.visible = true;
                this.rightArrow.visible = textPrompt.options.length > 1;
                this.rightArrow.fixedToCamera = true;
                this.currentOptionText.text = textPrompt.options[0].text;
                this.currentOptionText.visible = true;
                this.options = textPrompt.options;
                this.game.inputs.left.onDown.add(this.scrollLeft, this);
                this.game.inputs.right.onDown.add(this.scrollRight, this);
            }
        }
    }
}