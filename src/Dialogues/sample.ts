module MyGame {
    export function getDialogue(name: string) {
        switch (name) {
            case "dump":
                return new TextDump(["Once upon a time there was a wonderful butt.",
                "This butt could do anything.",
                "And I mean anything."
            ])
            case "sample":
                return new TextPrompt(["Hello. How are you?"], [
                    new TextOption("Good", new TextDump(["That's good."])),
                    new TextOption("Bad", new TextDump(["That's too bad"]))
                ]);
        }
        throw new Error(`Dialogue with name ${name} not found.`);
    }
}