module MyGame {
    export class PatternDisplayer {
        game: Battle;
        patternGenerator: PatternGenerator;
        tempo: number;
        maxNumNotes: number;
        minNumNotes: number;
        isDisplaying: boolean;
        currentPattern: PatternNote[];
        noteDisplays: Phaser.Text[];
        
        readonly fontStyle = { font: "14px okeydokey", fill: "#000000" };

        constructor(game: Battle, minNumNotes: number, maxNumNotes: number, patternLength: number,
            beatLength: number, tempo: number) {
            this.game = game;
            this.isDisplaying = false;
            this.tempo = tempo;
            this.minNumNotes = minNumNotes;
            this.maxNumNotes = maxNumNotes;
            var allowedNotes = [Phaser.KeyCode.W, Phaser.KeyCode.A,
            Phaser.KeyCode.S, Phaser.KeyCode.D, Phaser.KeyCode.O, Phaser.KeyCode.K];
            this.patternGenerator = new PatternGenerator(patternLength, beatLength, allowedNotes);
        }

        display(): PatternNote[] {
            if (this.isDisplaying) {
                return;
            }
            this.isDisplaying = true;
            this.noteDisplays = [];
            var numNotes = Math.floor(Math.random() + (this.maxNumNotes - this.minNumNotes)) + this.minNumNotes;
            this.currentPattern = this.patternGenerator.generate(numNotes);
            console.log(this.currentPattern);
            for (let i = 0; i < this.patternGenerator.length; i++) {
                this.game.time.events.add(this.tempo * i, this.showNote, this, i);
            }
            this.game.time.events.add((this.patternGenerator.length + 1) * this.tempo, function () {
                this.isDisplaying = false;
            }, this);
            return this.currentPattern;
        }

        reset() {
            this.currentPattern = null;
            this.isDisplaying = false;
            if (this.noteDisplays !== undefined) {
                this.noteDisplays.forEach(function (disp) {
                    disp.destroy();
                });
            }
        }

        private showNote(position: number) {
            var notes = this.currentPattern.filter(function (value) {
                return value.position === position;
            });
            var text = notes.length > 0 ? PatternDisplayer.getKeyString(notes[0].key) : "-";
            this.noteDisplays.push(this.game.add.text(10, 20 * position, text, this.fontStyle))
        }

        static getKeyString(key: Phaser.KeyCode): string {
            switch (key) {
                case Phaser.KeyCode.W:
                    return "UP";
                case Phaser.KeyCode.A:
                    return "LEFT";
                case Phaser.KeyCode.S:
                    return "DOWN";
                case Phaser.KeyCode.D:
                    return "RIGHT";
                case Phaser.KeyCode.O:
                    return "O";
                case Phaser.KeyCode.K:
                    return "K";
            }
            return "-";
        }
    }
}