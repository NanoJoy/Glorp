module MyGame {
    export class BottomTextDisplay implements TextDisplay {
        game: Phaser.State;
        inputs: Inputs;
        textBackground: Phaser.Image;
        upArrow: Phaser.Image;
        downArrow: Phaser.Image;
        name: string;
        textEncounter: ITextEncounter;
        pageNumber: number;
        isDisplaying: boolean;
        text: Phaser.BitmapText;
        parent: Entity;
        optionsDisplay: OptionsDisplay;
        currentRead: Boolean;

        readonly spriteHeight = 80;
        readonly fontStyle = { font: "14px okeydokey", fill: "#000000" };

        constructor(game: Phaser.State, inputs: Inputs, parent: Entity) {
            this.game = game;
            this.inputs = inputs;
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
                this.text.text = this.textEncounter.getCurrentPage().getText()[this.pageNumber];
                this.setDownArrowFrame(true);
                this.upArrow.visible = this.pageNumber > 0;
                this.game.sound.play(Assets.Audio.Beep.key);
            }
        }

        scrollDown() {
            if (this.downArrow.frame === Frames.Arrow.DOWN) {
                this.pageNumber += 1;
                this.text.text = this.textEncounter.getCurrentPage().getText()[this.pageNumber];
                this.upArrow.visible = true;
                this.setDownArrowFrame(this.pageNumber < this.textEncounter.getCurrentPage().getText().length - 1);
                this.currentRead = this.currentRead || this.downArrow.frame === Frames.Arrow.O;
                if (this.currentRead && this.optionsDisplay.getCurrentOption() !== -1) {
                    this.optionsDisplay.show();
                }
                this.game.sound.play(Assets.Audio.Beep.key);
            }
        }

        scrollRight() {
            this.optionsDisplay.scrollRight();
        }

        scrollLeft() {
            this.optionsDisplay.scrollLeft();
        }

        makeChoice() {
            if (!this.currentRead) {
                return;
            }
            this.game.sound.play(Assets.Audio.Beep.key);
            var next = this.textEncounter.getResponse(this.optionsDisplay.getCurrentOption());
            if (!next) {
                this.textBackground.destroy();
                this.text.destroy();
                let result = this.optionsDisplay.isVisible() ? this.optionsDisplay.getCurrentText() : this.text.text;
                this.optionsDisplay.destroy();
                if (this.downArrow) this.downArrow.destroy();
                if (this.upArrow) this.upArrow.destroy();
                this.textEncounter.lastResult = result;
                if (this.game instanceof Main) {
                    this.game.unstopPlayer();
                    this.textEncounter.onFinish(this.game, this.parent, result);
                } else {
                    this.textEncounter.onFinish(null, null, result);
                }
                this.textEncounter.reset();
                this.inputs.O.onUp.remove(this.addOnDownListener, this);
                this.inputs.O.onDown.remove(this.makeChoice, this);
                this.inputs.down.onDown.remove(this.scrollDown, this);
                this.inputs.up.onDown.remove(this.scrollUp, this);
                this.inputs.O.onUp.addOnce(function () {this.isDisplaying  = false;}, this);
                return;
            }
            if (!next.hasOptions) {
                this.optionsDisplay.setOptions(null);
                this.optionsDisplay.hide();
                this.inputs.right.onDown.remove(this.scrollRight, this);
                this.inputs.left.onDown.remove(this.scrollLeft, this);
                this.text.text = next.getText()[0];
                this.pageNumber = 0;
                this.upArrow.visible = false;
                this.setDownArrowFrame(this.textEncounter.getCurrentPage().getText().length > 1);
                this.currentRead = this.currentRead || this.downArrow.frame === Frames.Arrow.O;
                this.inputs.O.onUp.add(this.addOnDownListener, this);
                return;
            }
            let nextPrompt = (next as TextPrompt);
            this.optionsDisplay.setOptions(nextPrompt.options);
            this.optionsDisplay.show();
            this.pageNumber = 0;
            this.text.text = next.getText()[0];
            this.upArrow.visible = false;
            this.setDownArrowFrame(nextPrompt.getText().length > 1);
            this.currentRead = this.currentRead || this.downArrow.frame === Frames.Arrow.O;
            this.inputs.left.onDown.add(this.scrollLeft, this);
            this.inputs.right.onDown.add(this.scrollRight, this);
            this.inputs.O.onUp.add(this.addOnDownListener, this);
        }

        addOnDownListener() {
            this.inputs.O.onDown.add(this.makeChoice, this);
        }

        start(textEncounter: ITextEncounter) {
            if (this.isDisplaying) {
                return;
            }
            this.textEncounter = textEncounter;
            if (this.game instanceof Main) {
                this.game.stopPlayer();
            }

            this.textBackground = this.game.add.image(0, 0, Assets.Images.BottomTextBackground);
            this.upArrow = this.game.add.image(SCREEN_WIDTH - 22, 8, Assets.Sprites.Arrow.key, Frames.Arrow.UP);
            this.textBackground.fixedToCamera = true;
            this.upArrow.visible = false;
            this.downArrow = this.game.add.image(SCREEN_WIDTH - 22, this.textBackground.height - 20, Assets.Sprites.Arrow.key);
            let page = this.textEncounter.getCurrentPage();
            this.setDownArrowFrame(page.getText().length > 1);
            this.currentRead = this.currentRead || this.downArrow.frame === Frames.Arrow.O;
            this.upArrow.fixedToCamera = true;
            this.downArrow.fixedToCamera = true;

            this.text = this.game.add.bitmapText(8, this.textBackground.y + 8, Assets.FontName, this.textEncounter.getCurrentPage().getText()[0], 14);
            this.text.maxWidth = SCREEN_WIDTH - 24;
            this.text.fixedToCamera = true;
            this.pageNumber = 0;
            this.isDisplaying = true;
            
            this.inputs.down.onDown.add(this.scrollDown, this);
            this.inputs.up.onDown.add(this.scrollUp, this);
            this.optionsDisplay = new OptionsDisplay(this.game, this.textBackground.height);
            this.inputs.O.onDown.add(this.makeChoice, this);
            if (this.textEncounter.getCurrentPage().hasOptions) {
                var textPrompt = this.textEncounter.getCurrentPage() as TextPrompt;
                this.optionsDisplay.setOptions(textPrompt.options);
                this.inputs.left.onDown.add(this.scrollLeft, this);
                this.inputs.right.onDown.add(this.scrollRight, this);
                this.optionsDisplay.show();
            } else {
                this.optionsDisplay.setOptions(null);
                this.optionsDisplay.hide();
            }

            this.game.sound.play(Assets.Audio.Doodle.key);
        }

        private setDownArrowFrame(showDownArrow: boolean): void {
            this.downArrow.frame = showDownArrow ? Frames.Arrow.DOWN : Frames.Arrow.O;
        }
    }

    class OptionsDisplay implements Display {
        private main: Phaser.State;
        private background: Phaser.Image;
        private rightArrow: Phaser.Image;
        private leftArrow: Phaser.Image;
        private text: Phaser.BitmapText;
        private displayGroup: Phaser.Group;
        private showing: boolean;
        private options: TextOption[];
        private currentOption: number;
        
        constructor(main: Phaser.State, baseY: number) {
            this.main = main;

            this.background = this.main.add.image(0, baseY, Assets.Images.OptionsBackground);
            this.background.fixedToCamera = true;

            this.leftArrow = this.main.add.image(6, baseY + 12, Assets.Sprites.Arrow.key, Frames.Arrow.LEFT);
            this.leftArrow.fixedToCamera = true;

            this.rightArrow = this.main.add.image(SCREEN_WIDTH - 18, baseY + 12, Assets.Sprites.Arrow.key, Frames.Arrow.RIGHT);
            this.rightArrow.fixedToCamera = true;

            this.text = this.main.add.bitmapText(18, baseY + 8, Assets.FontName, "", 14);
            this.text.fixedToCamera = true;

            this.displayGroup = main.add.group();
            this.displayGroup.addMultiple([this.background, this.leftArrow, this.rightArrow, this.text]);

            this.options = [];
            this.currentOption = -1;
            this.showing = true;
            this.hide();
        }

        setOptions(options: TextOption[]) {
            this.options = options;
            if (Utils.isAThing(options)) {
                this.currentOption = 0;
                this.text.text = options[0].text;
                if (this.showing) {
                    this.setArrowVisibility();
                }
            } else {
                this.currentOption = -1;
            }
        }

        show() {
            if (this.showing) return;
            if (!Utils.isAThing(this.options) || this.currentOption === -1) {
                throw new Error("Cannot show display with no options.");
            }
            this.displayGroup.visible = true;
            this.text.text = this.options[this.currentOption].text;
            this.setArrowVisibility();
            this.bringToTop();
            this.showing = true;
        }

        hide() {
            if (!this.showing) return;
            this.displayGroup.visible = false;
            this.showing = false;
        }

        bringToTop() {
            this.main.world.bringToTop(this.displayGroup);
            this.displayGroup.bringToTop(this.text);
            this.displayGroup.bringToTop(this.leftArrow);
            this.displayGroup.bringToTop(this.rightArrow);
        }

        scrollRight() {
            if (this.rightArrow.visible) {
                this.currentOption += 1;
                this.text.text = this.options[this.currentOption].text;
                this.setArrowVisibility();
                this.main.sound.play(Assets.Audio.Beep.key);
            }
        }

        scrollLeft() {
            if (this.leftArrow.visible) {
                this.currentOption -= 1;
                this.text.text = this.options[this.currentOption].text;
                this.setArrowVisibility();
                this.main.sound.play(Assets.Audio.Beep.key);
            }
        }

        getCurrentOption(): number {
            return this.currentOption;
        }

        getCurrentText(): string {
            return this.options[this.currentOption].text;
        }

        isVisible(): boolean {
            return this.showing;
        }

        destroy() {
            this.displayGroup.destroy();
        }

        private setArrowVisibility() {
            this.leftArrow.visible = this.currentOption !== 0;
            this.rightArrow.visible = this.currentOption !== this.options.length - 1;
        }
    }
}