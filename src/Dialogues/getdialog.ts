module MyGame {
    export enum Texts {
        GRANDPA,
        SIGHING,
        THE_MEEP,
        PATH_TO_TUTTLE_VILLAGE,
        TUTTLE_VILLAGE,
        ALBERT_FIRST,
        HOW_TO_SAVE,
        LULLY_POND,
        MEEP_GROWL
    }

    function getSignText(info: string): ITextManager {
        return new TextManager([new TextEncounter(new TextDump(info))]);
    }

    export function getDialog(key: Texts): ITextManager {
        switch (key) {
            case Texts.ALBERT_FIRST:
                return getAlbertText();
            case Texts.GRANDPA:
                return getGrandpaText();
            case Texts.LULLY_POND:
                return getSignText("Lully Pond");
            case Texts.PATH_TO_TUTTLE_VILLAGE:
                return getSignText("Path to Tuttle Village");
            case Texts.SIGHING:
                return new TextManager([new TextEncounter(new TextDump("Sigh...", new TextDump("This time of year always reminds me of when Sarah left.")))]);
            case Texts.THE_MEEP:
                return getSignText("The Meep");
            case Texts.TUTTLE_VILLAGE:
                return getSignText("Tuttle Village");
            case Texts.HOW_TO_SAVE:
                return getSignText("It's good to save often. You can save by pressing the SPACEBAR to pause, then pressing O when you have the Save option selected. If you die, you will be sent back to your last save.");
            case Texts.MEEP_GROWL:
                return getTheMeepText();
            default:
                throw new Error(`Cannot find dialog for key '${key}'.`);
        }
    }
}