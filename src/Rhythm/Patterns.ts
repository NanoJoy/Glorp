module MyGame {
    export class PatternUtil {
        static convertPatternNotesToArray(notes: PatternNote[], length: number): Phaser.KeyCode[] {
            var arr = [] as Phaser.KeyCode[];
            for (let i = 0; i < length; i++) {
                arr.push(null);
            }
            notes.forEach(function (value) {
                if (value.position > length) {
                    throw new Error("Note position is greater than pattern length");
                }
                arr[value.position] = value.key;
            });
            return arr;
        }

        static getNthNote(pattern: Phaser.KeyCode[], position: number): Phaser.KeyCode {
            return pattern.filter(p => Utils.isAThing(p))[position];
        }
    }

    export class PatternGenerator {
        public length: number;
        public beatLength: number;
        public allowedNotes: Phaser.KeyCode[];

        constructor(length: number, beatLength: number, allowedNotes: Phaser.KeyCode[]) {
            if (length <= 0 || beatLength <= 0) {
                throw new Error("length and beatLength must be > 0");
            }
            if (length % beatLength !== 0) {
                throw new Error("beatLength must evenly divide length");
            }
            if (allowedNotes.length === 0) {
                throw new Error("Must be at least one allowed note.")
            }
            this.length = length;
            this.beatLength = beatLength;
            this.allowedNotes = allowedNotes;
        }

        generate(numNotes: number): PatternNote[] {
            var usedPositions = [] as number[];
            var pattern = [] as PatternNote[];
            for (let i = 0; i < numNotes; i++) {
                let position = Math.floor(Math.random() * this.length);
                while (usedPositions.indexOf(position) !== -1) {
                    position = Math.floor(Math.random() * this.length);
                }
                usedPositions.push(position);
                pattern.push({
                    position: position,
                    key: this.allowedNotes[Math.floor(Math.random() * this.allowedNotes.length)]
                });
            }
            return pattern;
        }
    }

    export class PatternNote {
        public position: number;
        public key: Phaser.KeyCode;
    }
}