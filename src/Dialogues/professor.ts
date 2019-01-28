module MyGame {
    export function getProfessorText(): ITextManager {

        function getWhatHappened() {
            return new TextPrompt("This morning when I came in, three important parts were missing from my machine. I checked my security footage but all I was a blur in one frame, then the machine was broken in the next. "
                + "I can't leave my house because I have to monitor another one of my experiments for today or else it may explode. I need you to ask around and see if anyone has seen weird technology lying around. Also if you find anything " +
                "can you bring it back here?", [
                    new TextOption("Sure thing."),
                    new TextOption("Nah.", getNoResponse())
                ]);
        }

        function getYesResponse() {
            return new TextPrompt("Great. I have been working a machine for the past five years that I hope can help us communicate with the Beasts. I've been analyzing their noises " +
                "and they seem to be used at least partially to indicate to the other Beasts the position, size and shape of the Beast making the noise. I'm hoping that if we send out a consistent signal that indicates what we are like, " +
                "They might at least acknowledge us in some way. That would be really exciting!", [
                    new TextOption("Sounds cool.", new TextDump("I know. I really think it can bring us into a new age, and maybe soon we can reconnect with other worlds! But there's a big problem.",
                        getWhatHappened()
                    )),
                    new TextOption("Sounds dangerous.", new TextDump("Haven't you heard the stories about ancient times? A long time ago, the Beasts used to be our friends and guides to other worlds, an important bond to the primal side of ourselves. " +
                        "I think that reconnecting with them now could lead to new age for us. Besides that, Remember when Daniel went missing in the woods a few years ago, then turned up in town unhurt? The doctor found chemicals on his skin that are consistent with the readings " +
                        "we get from the Beasts when they fly over. So I really think there is no reason to assume they would want to harm us.", getWhatHappened())
                    )]);
        }

        function getNoResponse() {
            return new TextDump("Uh... I guess I understand, we all have a lot to do today. I guess I can ask Stacy since you don't want to give your old professor a hand.")
        }

        return new TextManager([
            // 0
            new TextEncounter(new TextPrompt("Rosie! I see your mother told you I needed you.", [
                new TextOption("I saw Albert.", new TextPrompt("Oh yeah, He's having some problems today too isn't he? Very strange. But can you help me with my problems?", [
                    new TextOption("Sure, why not.", getYesResponse()),
                    new TextOption("Not really.", getNoResponse())
                ])),
                new TextOption("Sure.", new TextPrompt("Cool, I'm glad. Can you help me with some big problems I'm having?", [
                    new TextOption("Sure, why not.", getYesResponse()),
                    new TextOption("Not really.", getNoResponse())
                ]))
            ])),
            // 1
            new TextEncounter(new TextPrompt("Hello again. Have you changed your mind? Will you help me?", [
                new TextOption("Yes.", getYesResponse()),
                new TextOption("Not yet.", new TextDump("Okay, then I really don't have time to talk right now."))
            ])),
            // 2
            new TextEncounter(new TextPrompt("Hello again. Have you changed your mind? Will you help me?", [
                
            ]))
        ])
    }
}