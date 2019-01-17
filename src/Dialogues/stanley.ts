module MyGame {
    export function getStanleyText(): ITextManager {
        function getInstruction(): TextPrompt {
            return new TextPrompt("Well, it seems like to get it to cook evenly, you have to press the buttons that it says on the screen in tempo. "
            + "But the crazy thing is you have to press them in the reverse order of how it displays them. Do you think you can handle that?", [
                new TextOption("Sure!", new TextDump("Okay, go for it.")),
                new TextOption("I dunno...", new TextDump("Alright, think about it, but please come back soon."))
            ])
        }

        function getOven(): TextPrompt {
            return new TextPrompt("Meanwhile, I've been stuck here cooking without you. Mom has even been making snarky comments about how I could stand to learn to cook by myself." + 
            " Anyways I'm actually doing pretty good with this Blish and Blerry pie, but I can't figure out how to work the oven.", [
                new TextOption("Too bad", new TextDump("You know what? I hate you too. Goodbye.")),
                new TextOption("Let me try", getInstruction())
            ])
        }

        function startOven(main: Main, parent: Entity, result: string) {
            if (result === "Okay, go for it.") {
                let enemy = new OvenEncounter(main);
                enemy.startBattle();
            }
        }

        function giveGrodule(main: Main, parent: Entity, result: string) {
            let stanley = parent as Stanley;
            stanley.setSpeed(1000);
            stanley.doScript("du", pof(18 + main.island.paddingOffset.x, 4 + main.island.paddingOffset.y), true);
            main.addItem(17 + main.island.paddingOffset.x, 2 + main.island.paddingOffset.y, Assets.Sprites.Grodule.key);
        }

        function decision(lastViewed: number, main: Main, parent: Entity, lastResult: string): number {
            if (lastViewed === -1) {
                return 0;
            }
            if (lastViewed === 0 || lastViewed === 1 || lastViewed === 2) {
                if (StateTransfer.getInstance().reason === TransferReason.VICTORY) {
                    return 3;
                }
                switch (lastResult) {
                    case "Arrrgggghhh!!!":
                    case "You know what? I hate you too. Goodbye.":
                        return 1;
                    case "soon.":
                    case "comes.":
                        return 2;
                    case "Okay, go for it.":
                        return 3;
                    default:
                        return lastViewed;
                }
            }
            if (lastViewed === 3) {
                return 4;
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
            new TextEncounter(new TextPrompt("Hmm. Looks like you've come crawling back after having some fun on the town. Ready to help me with the oven?", [
                new TextOption("Soon, I promise.", new TextDump("Please, it has to be ready before the first Beast comes.")),
                new TextOption("Yup.", getInstruction()),
                new TextOption("Hahaha... No.", new TextDump("Arrrgggghhh!!!"))
            ]), false, startOven),
            // 2
            new TextEncounter(new TextPrompt("Do you think you can help me with this? I still can't quite get it.", [
                new TextOption("Soon, I promise.", new TextDump("Please, it has to be ready before the first Beast comes.")),
                new TextOption("Yup.", getInstruction()),
                new TextOption("Hahaha... No.", new TextDump("Arrrgggghhh!!!"))
            ]), false, startOven),
            // 3
            new TextEncounter(new TextDump("Wow, thanks Rosie! The pie should be ready in about an hour. Oh, by the way, I found this thing lying around the toofball field. You can take it if you want it."), true, giveGrodule),
            // 4
            new TextEncounter(new TextDump("I can smell it already. MMmm... Blish and Blerry..."))
        ], decision);
    }
}