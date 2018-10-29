module MyGame {
    export function getAlbertText(): TextManager {
        function danceDance() {
            return new TextPrompt("For each measure that appears on the screen, you have to repeat the pattern in order. "
            + "You don't even have to hit the moves on the same beats, but if you do it should hurt them more. "
            + "Just remember that if you see an up arrow it is really the W key, the down arrow is the S key, etcetera. "
            + "Go give it a shot.", [
                new TextOption("Sounds good!"),
                new TextOption("... I'll try.")
            ])
        }

        function getJambotExplanation() {
            return new TextPrompt("It's just that some weird interference has caused them to act up and start acting a little aggressive. " 
            + "My idea for them was that they could be robots you could practice dancing with. Pretty fun, right? They're called JamBots. "
            + "Originally, if you made a wrong move they would emit a little beep. But now they let out a supersonic sound blast that can really hurt you.", [
                new TextOption("You can fix this.", new TextDump("You know I can't dance, Rosie! That's why I made these to practice with. Just let me explain what to do and I know you can get past them.", danceDance())),
                new TextOption("How can I help?", new TextDump("Thank you, Rosie. You know I can't dance.", danceDance()))
            ])
        }

        let dumpy = new TextDump("If you want to do any damage to them, you'll have to hit the notes on the same beat as them. Try it out.");
        function getJamBugExplanation() {
            return new TextPrompt("The JamBots were supposed to be the beginner's version. The hard version is called JamBugs. And they also started acting up. I managed to trap them behind this gate, but you'll have to go through them to get to town.", [
                new TextOption("Anything else?", dumpy)
            ]);
        }

        function decision(lastViewed: number, main: Main, parent: Entity): number {
            if (lastViewed < 0) {
                return 0;
            }
            if (lastViewed < 2) {
                let jambotsLeft = main.groups.enemies.filter(e => e instanceof JamBot).length > 0;
                return jambotsLeft ? 1 : 2;
            }
            return 3;
        }

        return new TextManager([
            new TextEncounter(new TextPrompt("Hello Rosie.", [
                new TextOption("Oh hey Albert.", new TextPrompt("Do you want to hear about my latest invention?", [
                    new TextOption("Sure!", new TextDump("That's good, because your survival might depend on it! Just kidding, I think.", getJambotExplanation())),
                    new TextOption("Not really...", new TextDump("Well, I think you had better listen anyway, if you want to survive. Um, just kidding!", getJambotExplanation()))
                ]))
            ])),
            new TextEncounter(danceDance()),
            new TextEncounter(new TextPrompt("Wow, thanks! I knew you could do it. But uh...", [
                new TextOption("What?", getJamBugExplanation()),
                new TextOption("*Sigh*", getJamBugExplanation())
            ]), true),
            new TextEncounter(dumpy)
        ], decision)
    }
}