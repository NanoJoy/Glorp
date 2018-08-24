module MyGame {
    export function getGrandpaText(): TextManager {

        function getAfterNap(): TextPage {
            return new TextDump("When you see the first Beast block out the sun, you'll really get a sense of how massive they are. And the noises they make really are bizarre. " +
                "In school they had given us a sheet of all the different kinds people have seen in the past centuries, and we were supposed to check them off as they passed above. " +
                "I was so in awe that I couldn't even look down at the list. I got an F on the assignment! " +
                "Apparently there was a new Beast that year that had never been seen before. My mom had to work late hours studying its sounds. " +
                "But anyway, I've been blabbing long enough. You had better get back into town to help out your brother.");
        }

        
        function getDreamResponse(): TextPage {
            return new TextPrompt("What happened in your dream?", [
                new TextOption("The Giants attacked!", new TextDump("I was a little scared before my first Feast too.", getAfterNap())),
                new TextOption("None of the food was ready.", new TextDump("I see. You are feeling guilty because you are napping instead of helping your brother prepare your family's portion. " + 
                    "But there is nothing wrong with resting so you can really enjoy your first Feast.", getAfterNap()))
            ]);
        }

        return new TextManager([
            new TextEncounter(new TextPrompt("Hello Rosie. Did you enjoy your nap?", [
                new TextOption("Yes.",
                    new TextPrompt("That's good. I hope you are well rested for your first Feast of the Giants.", [
                        new TextOption("I am pretty excited.",
                            new TextDump("Well, you are braver than I was at your age.", getAfterNap())),
                        new TextOption("I'm a little nervous.",
                            new TextDump("I was a little scared at my first Feast too.", getAfterNap()))
                    ]
                    )
                ),
                new TextOption("Not really.", 
                    new TextPrompt("Oh... Why not?", [
                        new TextOption("I had bad dreams.", new TextPrompt("About what? The Feast of the Giants?", [
                            new TextOption("Yeah...", getDreamResponse()),
                            new TextOption("More or less.", getDreamResponse())
                        ]))
                    ]))
            ]))]);
    }
}