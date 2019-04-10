module MyGame {
    export enum Texts {
        GRANDPA,
        SIGHING,
        ALBERT_FIRST,
        MEEP_GROWL,
        STANLEY,
        PROFESSOR,
        BLUMPUS,
        TUTORIAL_SIGN,
        TUTORIAL_PERSON,
        MONSTER,
        INTERLUDE
    }

    export function getSignText(info: string): ITextManager {
        return new TextManager([new TextEncounter(new TextDump(info))]);
    }

    export function getDialog(key: Texts): ITextManager {
        switch (key) {
            case Texts.ALBERT_FIRST:
                return getAlbertText();
            case Texts.GRANDPA:
                return getGrandpaText();
            case Texts.SIGHING:
                return new TextManager([new TextEncounter(new TextDump("Sigh...", new TextDump("This time of year always reminds me of when Sarah left.")))]);
            case Texts.MEEP_GROWL:
                return getTheMeepText();
            case Texts.STANLEY:
                return getStanleyText();
            case Texts.PROFESSOR:
                return getProfessorText();
            case Texts.BLUMPUS:
                return getBlumpusText();
            case Texts.TUTORIAL_SIGN:
                return new TextManager([
                    new TextEncounter(new TextDump("Use S to scroll down, and W to scroll up. When you reach the bottom, press O (the letter) to continue. " +
                        " use WASD to move and O (the letter) to interact with things."), true),
                    new TextEncounter(new TextDump("Use S to scroll down, and W to scroll up. When you reach the bottom, press O (the letter) to continue. " +
                        " use WASD to move and O (the letter) to interact with things."))
                ]);
            case Texts.TUTORIAL_PERSON:
                let finish = (main: Main, parent: Entity, result?: string) => {
                    if (result === "Here you go.") {
                        main.groups.barriers.filter(b => b instanceof Gate)[0].sprite.destroy();
                        WorldManager.getInstance().changeLayout(9, main.island.getAdjustedPosition(pof(4, 4)), " ");
                    }
                };
                let decision = (lastViewed: number, main: Main, parent: Entity, lastResult?: string) => {
                    if (lastViewed === -1) {
                        return 0;
                    }
                    if (lastViewed === 0) {
                        return lastResult === "Suit yourself." ? 0 : 1;
                    }
                    return 1;
                };
                return new TextManager([
                    new TextEncounter(new TextDump("When you are given a prompt, use A and D to view your options, and O to select an option after you have read the entire prompt.",
                        new TextPrompt("Would you like me to open this gate?", [
                            new TextOption("No.", new TextDump("Suit yourself.")),
                            new TextOption("Yes please.", new TextDump("Here you go."))
                        ])), false, finish),
                    new TextEncounter(new TextDump("Go on ahead then."))
                ], decision);
            case Texts.MONSTER:
                let monsFin = (main: Main, parent: Entity, result?: string) => {
                    let monster = parent as Monster;
                    monster.doMouth();
                };
                return new TextManager([
                    new TextEncounter(new TextDump("Don't let them all die, Rosie."), false, monsFin)
                ]);
            case Texts.INTERLUDE:
                return new TextManager([new TextEncounter(new TextDump("What was that?", new TextDump("...",
                new TextDump("Oh, I guess it was just a dream. But I feel like I've seen that thing before somewhere."))))]);
            default:
                throw new Error(`Cannot find dialog for key '${key}'.`);
        }
    }
}