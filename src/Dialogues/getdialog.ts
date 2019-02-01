module MyGame {
    export enum Texts {
        GRANDPA,
        SIGHING,
        ALBERT_FIRST,
        MEEP_GROWL,
        STANLEY,
        PROFESSOR,
        BLUMPUS
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
                return new TextManager([
                    new TextEncounter(new TextDump("Oh gosh, my pet Blumpus has fallen asleep in the worst spot. If only I had something to make a high pitched sound to wake him up. Though if he wakes up, he might be in the mood to dance.")),
                    new TextEncounter(new TextDump("Yup, whoever wakes him up better be a pretty good dancer."))
                ]);
            default:
                throw new Error(`Cannot find dialog for key '${key}'.`);
        }
    }
}