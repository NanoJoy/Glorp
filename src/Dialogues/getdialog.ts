module MyGame {
    export enum Texts {
        GRANDPA,
        SIGHING,
        ALBERT_FIRST,
        MEEP_GROWL,
        STANLEY
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
            default:
                throw new Error(`Cannot find dialog for key '${key}'.`);
        }
    }
}