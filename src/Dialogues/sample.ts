module MyGame {
    export function getDialog(key: string): TextManager {
        switch (key) {
            case "oldman":
                return new TextManager([new TextEncounter(new TextDump("Go away"))]);
            case "mrDorpnersHouse":
                return new TextManager([new TextEncounter(new TextDump("Mr. Dorpner's House."))]);
            case "sample":
                return new TextManager([new TextEncounter(new TextPrompt("I must ask one question. Hello. How are you?", [
                    new TextOption("Good", new TextDump("That's good.")),
                    new TextOption("Bad", new TextDump("That's too bad"))
                ]))]);
            default:
                throw new Error(`Cannot find dialog for key '${key}'.`);
        }
    }
}