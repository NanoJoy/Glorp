module MyGame {
    export enum Texts {
        GRANDPA
    }

    export function getDialog(key: Texts): TextManager {
        switch (key) {
            case Texts.GRANDPA:
                return getGrandpaText();
            default:
                throw new Error(`Cannot find dialog for key '${key}'.`);
        }
    }
}