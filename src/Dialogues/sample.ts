module MyGame {
    export function getDialogue(name: string) {
        switch (name) {
            case "sample":
                return new TextPrompt(" 0123456789 .,“”‘’\"'?!@_*#$%&()+-/:;<=>[\\]^`{|}~", [
                    new TextOption("Good", new TextDump("That's good.")),
                    new TextOption("Bad", new TextDump("That's too bad"))
                ]);
        }
        throw new Error(`Dialogue with name ${name} not found.`);
    }
}