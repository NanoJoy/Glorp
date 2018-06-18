module MyGame {
    export class JamBot implements Enemy {
        minNumNotes = 4;
        maxNumNotes = 4;
        patternLength = 8;
        beatLength = 2;
        tempo = 500;
        spriteKey = "jambot";
        hitPoints = 200;

        calculateDamage(pattern: PatternNote[], notePresses: NotePress[]): number {
            if (pattern.length !== notePresses.length) {
                return 0;
            }
            var sortedPattern = pattern.sort(function (a, b) { return a.position - b.position });
            var sortedPresses = notePresses.sort(function (a, b) { return a.position - b.position });
            var damage = 0;
            for (var i = 0; i < sortedPattern.length; i++) {
                if (sortedPattern[i].key !== sortedPresses[0].note) {
                    return 0;
                }
                damage += Math.round((500 - sortedPresses[i].distance) / 50);
            }
            return damage;
        }
    }
}