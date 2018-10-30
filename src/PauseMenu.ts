module MyGame {
    const OPTION_SPACING = 40;
    const LEFT_INDENT = 12;
    const TOP_PADDING = 30;
    const POINTER_PADDING = 2;
    const LEFT_PADDING = 20;

    export interface IPauseMenu {
        changeSelection: (key: Phaser.Key) => void;
        select: () => void;
        goBack: () => void;
        exit: () => void;
    }

    class Option {
        text: string;
        options: Option[];
    }

    export class PauseMenu implements IPauseMenu {
        private main: Main;
        private background: Phaser.Image;
        private pointer: Phaser.Image;
        private options: Option[];
        private texts: Phaser.BitmapText[];
        private infoText: Phaser.BitmapText;
        private cursor: number;

        constructor(main: Main) {
            this.main = main;
            this.background = this.main.add.image(main.camera.x, main.camera.y, Assets.Images.MenuBackground);
            this.background.fixedToCamera = true;
            this.pointer = this.main.add.image(LEFT_PADDING, 0, Assets.Sprites.Arrow.key);
            this.pointer.frame = 2;

            this.options = [
                {
                    text: "Save",
                    options: null
                },
                {
                    text: "Exit",
                    options: null
                }
            ];

            this.texts = [];

            this.displayOptions(this.options);
            this.infoText = this.main.add.bitmapText(0, this.main.camera.y + SCREEN_HEIGHT - 38, Assets.FontName, "", 14);
        }

        changeSelection(key: Phaser.Key) {
            this.infoText.text = "";
            switch (key.keyCode) {
                case Phaser.KeyCode.W:
                    if (this.cursor !== 0) {
                        this.texts[this.cursor].x -= LEFT_INDENT;
                        this.cursor -= 1;
                        this.texts[this.cursor].x += LEFT_INDENT;
                        this.pointer.y = OPTION_SPACING * this.cursor + TOP_PADDING + POINTER_PADDING;
                    }
                    break;
                case Phaser.KeyCode.S:
                    if (this.cursor !== this.texts.length - 1) {
                        this.texts[this.cursor].x -= LEFT_INDENT;
                        this.cursor += 1;
                        this.texts[this.cursor].x += LEFT_INDENT;
                        this.pointer.y = OPTION_SPACING * this.cursor + TOP_PADDING + POINTER_PADDING;
                    }
            }
        }

        select() {
            switch (this.options[this.cursor].text) {
                case "Exit":
                    this.exit();
                    this.main.game.paused = false;
                    break;
                case "Save":
                    this.showInfo("Saving game...");
                    this.main.saveGame();
                    this.showInfo("Game saved");
                    break;
            }
        }

        goBack() { }

        exit() {
            this.background.destroy();
            this.pointer.destroy();
            this.texts.forEach(t => t.destroy());
            this.infoText.text = "";
            this.main.inputs.down.onDown.remove(this.changeSelection, this);
            this.main.inputs.up.onDown.remove(this.changeSelection, this);
            this.main.inputs.O.onDown.remove(this.select, this);
        }

        private displayOptions(options: Option[]) {
            this.texts.forEach(t => t.destroy());
            for (let i = 0; i < options.length; i++) {
                this.texts.push(this.main.add.bitmapText(LEFT_PADDING, OPTION_SPACING * i + TOP_PADDING, Assets.FontName, options[i].text, 14));
                this.texts[i].position.add(this.main.camera.x, this.main.camera.y);
            }

            this.texts[0].x += LEFT_INDENT;
            this.pointer.y = TOP_PADDING;
            this.cursor = 0;
        }

        private showInfo(text: string) {
            this.infoText.text = text;
            this.infoText.x = this.main.camera.x + (SCREEN_WIDTH - this.infoText.width) / 2;
        }
    }
}