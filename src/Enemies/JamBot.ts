module MyGame {
    export class JamBot implements Enemy {
        minNumNotes = 4;
        maxNumNotes = 4;
        patternLength = 8;
        beatLength = 2;
        tempo = 500;
        spriteKey = "jambot";
        hitPoints = 200;
        health: number;

        constructor() {
            this.health = this.hitPoints;
        }

        calculateDamage(pattern: PatternNote[], notePresses: NotePress[]): number {
            if (pattern.length !== notePresses.length) {
                return 0;
            }
            var sortedPattern = pattern.sort(function (a, b) { return a.position - b.position });
            var sortedPresses = notePresses.sort(function (a, b) { return a.position - b.position });
            var damage = 0;
            for (var i = 0; i < sortedPattern.length; i++) {
                if (sortedPattern[i].key !== sortedPresses[i].note) {
                    return 0;
                }
                var amount = Math.round((500 - sortedPresses[i].distance) / 50);
                if (sortedPattern[i].position === sortedPresses[i].position) {
                    amount = Math.floor(amount * 1.5);
                }
                damage += amount;
            }
            return damage;
        }

        getAttackPoints(pattern: PatternNote[]) {
            return pattern.length * 20;
        }
    }
}