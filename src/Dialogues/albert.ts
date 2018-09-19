module MyGame {
    export function getAlbertText(): TextManager {
        function danceDance() {
            return new TextPrompt("For each measure that appears on the screen, you have to repeat the pattern in order. "
            + "You don't even have to hit the moves on the same beats, but it helps if you hit them on some beat. "
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

        return new TextManager([
            new TextEncounter(new TextPrompt("Hello Rosie.", [
                new TextOption("Oh hey Albert.", new TextPrompt("Do you want to hear about my latest invention?", [
                    new TextOption("Sure!", new TextDump("That's good, because your survival might depend on it! Just kidding, I think.", getJambotExplanation())),
                    new TextOption("Not really...", new TextDump("Well, I think you had better listen anyway, if you want to survive. Um, just kidding!", getJambotExplanation()))
                ]))
            ])),
        ])
    }
}