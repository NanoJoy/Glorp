module MyGame {
    export enum Texts {
        GRANDPA,
        SIGHING,
        THE_MEEP,
        TUTTLE_VILLAGE,
        ALBERT_FIRST,
        HOW_TO_SAVE
    }

    function getSignText(info: string): TextManager {
        return new TextManager([new TextEncounter(new TextDump(info))]);
    }

    export function getDialog(key: Texts): TextManager {
        switch (key) {
            case Texts.ALBERT_FIRST:
                return getAlbertText();
            case Texts.GRANDPA:
                return getGrandpaText();
            case Texts.SIGHING:
                return new TextManager([new TextEncounter(new TextDump("Sigh...", new TextDump("This time of year always reminds me of when Sarah left.")))]);
            case Texts.THE_MEEP:
                return getSignText("The Meep");
            case Texts.TUTTLE_VILLAGE:
                return getSignText("Tuttle Village");
            case Texts.HOW_TO_SAVE:
                return getSignText("It's good to save often. You can save by pressing the SPACEBAR to pause, then pressing O when you have the Save option selected. If you die, you will be sent back to your last save.")
            default:
                throw new Error(`Cannot find dialog for key '${key}'.`);
        }
    }
}