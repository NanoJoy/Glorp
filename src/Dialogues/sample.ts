module MyGame {
    export function getDialogue(name: string) {
        switch (name) {
            case "sample":
                return new TextPrompt("Hello. How are you?", [
                    new TextOption("Good", new TextDump("That's good.")),
                    new TextOption("Bad", new TextDump("That's too bad"))
                ]);
        }
        throw new Error(`Dialogue with name ${name} not found.`);
    }

    var dialogues = {
        "sample": [
            new TextPrompt("Hello. How are you?", [
                new TextOption("Good", new TextDump("That's good.")),
                new TextOption("Bad", new TextDump("That's too bad"))
            ])
        ]
    };
}