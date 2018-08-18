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
        private texts: Phaser.Text[];
        private infoText: Phaser.Text;
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
            this.infoText = this.main.add.text(0, SCREEN_HEIGHT - 38, "", { font: "28px okeydokey", fill: "#000000" });
        }

        changeSelection(key: Phaser.Key) {
            this.infoText.text = "";
            switch (key.keyCode) {
                case Phaser.KeyCode.W:
                    if (this.cursor !== 0) {
                        this.texts[this.cursor].x -= 10;
                        this.texts[this.cursor].fill = "#888888";
                        this.cursor -= 1;
                        this.texts[this.cursor].x += 10;
                        this.texts[this.cursor].fill = "#000000";
                    }
                    break;
                case Phaser.KeyCode.S:
                    if (this.cursor !== this.texts.length - 1) {
                        console.log("here");
                        this.texts[this.cursor].x -= 10;
                        this.texts[this.cursor].fill = "#888888";
                        this.cursor += 1;
                        this.texts[this.cursor].x += 10;
                        this.texts[this.cursor].fill = "#000000";
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
        }

        private displayOptions(options: Option[]) {
            this.texts.forEach(t => t.destroy());
            for (let i = 0; i < options.length; i++) {
                this.texts.push(this.main.add.text(20, 40 * i + 30, options[i].text,
                    { font: "28px okeydokey", fill: "#888888" }));
                this.texts[i].position.add(this.main.camera.x, this.main.camera.y);
            }

            this.texts[0].x += 10;
            this.texts[0].fill = "#000000";
            this.cursor = 0;
        }

        private showInfo(text: string) {
            this.infoText.text = text;
            this.infoText.x = (SCREEN_WIDTH - this.infoText.width) / 2;
        }
    }
}