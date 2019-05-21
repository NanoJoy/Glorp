module MyGame {
    export function getProfessorText(): ITextManager {

        let stateTransfer = StateTransfer.getInstance();
        let itemNames = ["grodule", "plorpus", "dinklepoofer"];

        function ctns(str: string, ...vals: string[]) {
            return vals.some(v => str.indexOf(v) !== -1);
        }

        function getItemsText(): string {
            let foundItems = itemNames.filter(n => stateTransfer.flags[n.toUpperCase() + "_FOUND"]);
            let notFoundItems = itemNames.filter(n => foundItems.indexOf(n) === -1);
            
            return `Wow, you found the ${foundItems.join(" and the ")}, but you still need to find the ${notFoundItems.join(" and the ")}.`;
        }

        function removeFoundItems(main: Main) {
            let foundItems = itemNames.filter(n => stateTransfer.flags[n.toUpperCase() + "_FOUND"]);
            foundItems.forEach(n => {
                let matchingBarriers = main.groups.barriers.filter(s => s instanceof Source && (s as Source).type === n).map(s => s as Source);
                matchingBarriers.forEach(s => {
                    s.remove();
                });
            });
        }

        function afterYesDecision(main: Main, professor: NPC): number {
            let sources = main.groups.barriers.filter(s => s instanceof Source 
                && Math.abs(professor.position.x - s.position.x) < 3 && Math.abs(professor.position.x - s.position.x) < 3).map(s => s as Source);
            
            for (let source of sources) {
                if (source.type === Assets.Sprites.Grodule.key) {
                    stateTransfer.flags["GRODULE_FOUND"] = true;
                }
            }
            let foundItems = itemNames.filter(n => stateTransfer.flags[n.toUpperCase() + "_FOUND"]);
            switch (foundItems.length) {
                case 0:
                    return 3;
                case 3:
                    return 5;
                default:
                    return 4;
            }
        }

        function decision(lastViewed: number, main: Main, parent: Entity, lastResult?: string): number {
            if (lastViewed === -1) {
                return 0;
            }

            if (lastViewed === 0) {
                if (ctns(lastResult, "reconsider!")) {
                    return 2;
                } else if (ctns(lastResult, "hand.")) {
                    return 1;
                }
                return afterYesDecision(main, parent as NPC);
            }
            if ((lastViewed === 1 || lastViewed === 2) && ctns(lastResult, "now.", "happens!", "hand.", "reconsider!")) {
                return 2;
            }
            return afterYesDecision(main, parent as NPC);
        }

        function getWhatHappened() {
            return new TextPrompt("This morning when I came in, three important parts were missing from my machine. I checked my security footage but all I was a blur in one frame, then the machine was broken in the next. "
                + "I can't leave my house because I have to monitor another one of my experiments for today or else it may explode. I need you to ask around and see if anyone has seen weird technology lying around. Also if you find anything " +
                "can you bring it back here?", [
                    new TextOption("Sure thing."),
                    new TextOption("Nah.", new TextDump("Please reconsider!"))
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
                new TextOption("Please re-explain.", getYesResponse()),
                new TextOption("I have objections.", new TextPrompt("I understand that you are worried about how the Beasts will respond. How about this? I promise I won't use the machine this year, " + 
                "and I will wait until more studies are completed. But I still really need those parts, because having my machine broken like this puts my lab into a very unstable state, and I'm afraid what might happen. So will you help me?", [
                    new TextOption("Yes", getWhatHappened()),
                    new TextOption("No", new TextDump("Sigh... Okay, I guess we'll see what happens!"))
                ])),
                new TextOption("Yes.", new TextDump("Nice, Thanks.", getWhatHappened()))
            ])),
            // 3
            new TextEncounter(new TextDump("Oh my, oh my... Please find the three missing parts Rosie!")),
            // 4
            new TextEncounter(new LazyTextDump(getItemsText, this), false, removeFoundItems),
            // 5
            new TextEncounter(new TextDump("You found them all."))
        ], decision);
    }
}