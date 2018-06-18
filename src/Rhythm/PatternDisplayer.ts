module MyGame {
    export class PatternDisplayer {
        game: Battle;
        patternGenerator: PatternGenerator;
        tempo: number;
        maxNumNotes: number;
        minNumNotes: number;
        isDisplaying: boolean;
        currentPattern: PatternNote[];
        noteDisplays: Phaser.Image[];
        
        readonly fontStyle = { font: "14px okeydokey", fill: "#000000" };

        constructor(game: Battle, enemy: Enemy) {
            this.game = game;
            this.isDisplaying = false;
            this.tempo = enemy.tempo;
            this.minNumNotes = enemy.minNumNotes;
            this.maxNumNotes = enemy.maxNumNotes;
            var allowedNotes = [Phaser.KeyCode.W, Phaser.KeyCode.A,
            Phaser.KeyCode.S, Phaser.KeyCode.D, Phaser.KeyCode.O, Phaser.KeyCode.K];
            this.patternGenerator = new PatternGenerator(enemy.patternLength, enemy.beatLength, allowedNotes);
        }

        display(): PatternNote[] {
            if (this.isDisplaying) {
                return;
            }
            this.isDisplaying = true;
            this.noteDisplays = [];
            var numNotes = Math.floor(Math.random() + (this.maxNumNotes - this.minNumNotes)) + this.minNumNotes;
            this.currentPattern = this.patternGenerator.generate(numNotes);
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
            var noteOrNull = notes.length > 0 ? notes[0].key : null
            var frame = PatternDisplayer.getKeyFrame(noteOrNull, position % this.patternGenerator.beatLength === 0);
            //10 padding on each side plus 24 for sprite width.
            var width = Constants.SCREEN_WIDTH - 44;
            var xPosition = (width / this.patternGenerator.length) * position + 10;
            this.noteDisplays.push(this.game.add.image(xPosition, 10, "rhythm_symbols", frame));
        }

        static getKeyFrame(key: Phaser.KeyCode, isBeat: boolean): number {
            switch (key) {
                case Phaser.KeyCode.W:
                    return 0;
                case Phaser.KeyCode.A:
                    return 1;
                case Phaser.KeyCode.S:
                    return 2;
                case Phaser.KeyCode.D:
                    return 3;
                case Phaser.KeyCode.O:
                    return 4;
                case Phaser.KeyCode.K:
                    return 5;
            }
            return isBeat ? 7 : 6;
        }
    }
}