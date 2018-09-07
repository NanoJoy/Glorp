module MyGame {
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
        private options: Option[];
        private texts: Phaser.BitmapText[];
        private infoText: Phaser.BitmapText;
        private cursor: number;

        constructor(main: Main) {
            this.main = main;
            this.background = this.main.add.image(main.camera.x, main.camera.y, Assets.Images.MenuBackground);
            this.background.fixedToCamera = true;

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
            this.infoText = this.main.add.bitmapText(0, SCREEN_HEIGHT - 38, Assets.FontName, "buttz", 28);
        }

        changeSelection(key: Phaser.Key) {
            this.infoText.text = "";
            switch (key.keyCode) {
                case Phaser.KeyCode.W:
                    if (this.cursor !== 0) {
                        this.texts[this.cursor].x -= 10;
                        this.cursor -= 1;
                        this.texts[this.cursor].x += 10;
                    }
                    break;
                case Phaser.KeyCode.S:
                    if (this.cursor !== this.texts.length - 1) {
                        console.log("here");
                        this.texts[this.cursor].x -= 10;
                        this.cursor += 1;
                        this.texts[this.cursor].x += 10;
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
            this.texts.forEach(t => t.destroy());
            this.infoText.text = "";
        }

        private displayOptions(options: Option[]) {
            this.texts.forEach(t => t.destroy());
            for (let i = 0; i < options.length; i++) {
                this.texts.push(this.main.add.bitmapText(20, 40 * i + 30, Assets.FontName, options[i].text, 14));
                this.texts[i].position.add(this.main.camera.x, this.main.camera.y);
            }

            this.texts[0].x += 10;
            this.cursor = 0;
        }

        private showInfo(text: string) {
            this.infoText.text = text;
            this.infoText.x = (SCREEN_WIDTH - this.infoText.width) / 2;
        }
    }
}