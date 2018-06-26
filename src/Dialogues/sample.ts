module MyGame {
    class Dialogz {
        [key: string]: TextPage;
        dump = new TextDump(["Just one page this time..."]);
        sample = new TextPrompt(["I must ask one question.", "Hello. How are you?"], [
            new TextOption("Good", new TextDump(["That's good."])),
            new TextOption("Bad", new TextDump(["That's too bad"]))
        ]);
    }

    export var Dialogs = new Dialogz();
}