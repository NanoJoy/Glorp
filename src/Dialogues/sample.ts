module MyGame {
    export function getDialogue(name: string) {
        switch (name) {
            case "dump":
                return new TextDump(["Just one page this time..."])
            case "sample":
                return new TextPrompt(["I must ask one question.", "Hello. How are you?"], [
                    new TextOption("Good", new TextDump(["That's good."])),
                    new TextOption("Bad", new TextDump(["That's too bad"]))
                ]);
        }
        throw new Error(`Dialogue with name ${name} not found.`);
    }
}