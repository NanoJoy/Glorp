module MyGame {
    export function getBlumpusText(): ITextManager {
        let blumpus = null as Blumpus;

        function decision(lastViewed: number, main: Main, parent: Entity, lastResult?: string): number {
            if (blumpus === null) {
                blumpus = main.groups.creatures.filter(c => c instanceof Blumpus)[0] as Blumpus;
            }
            if (blumpus.getHasWoken()) {
                return 2;
            }
            if (lastViewed === 0) {
                return 1;
            }
            return 0;
        }

        return new TextManager([
            new TextEncounter(new TextDump("Oh gosh, my pet Blumpus has fallen asleep in the worst spot. If only I had something to make a high pitched sound to wake him up. Though if he wakes up, he might be in the mood to dance.")),
            new TextEncounter(new TextDump("Yup, whoever wakes him up better be a pretty good dancer.")),
            new TextEncounter(new TextDump("Well, you figured out how to get him up, but he probably won't move until you prove your dominance in dancing."))
        ], decision);
    }
}