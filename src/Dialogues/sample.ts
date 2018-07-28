module MyGame {
    export class Dialogz {
        [key: string]: TextManager;
        
        mrDorpnersHouse = new TextManager([new TextEncounter(new TextDump("Mr. Dorpner's House."))]);

        sample = new TextManager([new TextEncounter(new TextPrompt("I must ask one question. Hello. How are you?", [
            new TextOption("Good", new TextDump("That's good.")),
            new TextOption("Bad", new TextDump("That's too bad"))
        ]))]);
    }
    
    export var Dialogs = new Dialogz();
}