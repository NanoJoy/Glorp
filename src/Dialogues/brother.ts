module MyGame {
    export function getBrotherText(): ITextManager {
        function getOven(): TextPrompt {
            return new TextPrompt("Meanwhile, I've been stuck here cooking without you. Mom has even been making snarky comments about how I could stand to learn to cook by myself." + 
            " Anyways I'm actually doing pretty good with this Blish and Blerry pie, but I can't figure out how to work the oven.", [
                new TextOption("Too bad", new TextDump("You know what? I hate you too. Goodbye.")),
                new TextOption("Let me try", new TextPrompt("Well, it seems like to get it to cook evenly, you have to press the buttons that it says on the screen in tempo. "
                + "But the crazy thing is you have to press them in the reverse order of how it displays them. Do you think you can handle that?", [
                    new TextOption("Sure!", new TextDump("Okay, go for it.")),
                    new TextOption("I dunno...", new TextDump("Alright, think about it, but please come back soon."))
                ]))
            ])
        }

        function startOven(main: Main, parent: Entity, result: string) {
            if (result === "Okay, go for it.") {
                StateTransfer.getInstance().enemy = new OvenEncounter();
                main.state.start(States.Battle);
            }
        }

        function decision(lastViewed: number, main: Main, parent: Entity, lastResult: string): number {
            if (lastViewed === -1) {
                return 0;
            }
            if (lastViewed === 0) {
                switch (lastResult) {
                    case "You know what? I hate you too. Goodbye.":
                        return 1;
                    case "Alright, think about it, but please come back soon.":
                        return 2;
                    case "Okay, go for it.":
                        return 3;
                    default:
                        return lastViewed;
                }
            }
            return lastViewed;
        }

        return new TextManager([
            // 0
            new TextEncounter(new TextPrompt("Hi Rosie. I see you could finally be bothered to come home.", [
                new TextOption("I was busy", new TextPrompt("I don't want to hear your excuses because I know you can only say like three words a time.", [
                    new TextOption("That makes sense", getOven())
                ])),
                new TextOption("Whatever", getOven()),
                new TextOption("Sorry, Stanley", new TextPrompt("I don't want to hear your excuses because I know you can only say like three words a time.", [
                    new TextOption("That makes sense", getOven())
                ]))
            ]), false, startOven),
            // 1
            new TextEncounter(new TextDump("I am mad.")),
            // 2
            new TextEncounter(new TextDump("I am okay.")),
            // 3
            new TextEncounter(new TextDump("I am happy."))
        ], decision);
    }
}