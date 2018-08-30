module MyGame {
    export enum Texts {
        GRANDPA,
        SIGHING,
        THE_MEEP,
        TUTTLE_VILLAGE
    }

    function getSignText(info: string): TextManager {
        return new TextManager([new TextEncounter(new TextDump(info))]);
    }

    export function getDialog(key: Texts): TextManager {
        switch (key) {
            case Texts.GRANDPA:
                return getGrandpaText();
            case Texts.SIGHING:
                return new TextManager([new TextEncounter(new TextDump("Sigh...", new TextDump("This time of year always reminds me of when Sarah left.")))]);
            case Texts.THE_MEEP:
                return getSignText("The Meep");
            case Texts.TUTTLE_VILLAGE:
                return getSignText("Tuttle Village");
            default:
                throw new Error(`Cannot find dialog for key '${key}'.`);
        }
    }
}