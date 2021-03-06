module MyGame {
    export enum Texts {
        GRANDPA,
        SIGHING,
        ALBERT_FIRST,
        MEEP_GROWL,
        STANLEY,
        PROFESSOR,
        BLUMPUS,
        TUTORIAL_SIGN,
        TUTORIAL_PERSON,
        MONSTER,
        INTERLUDE,
        ANIMAL_BEHAVIOR,
        PARK_BOOK,
        WARNING_BOOK
    }

    export function getSignText(info: string): ITextManager {
        return new TextManager([new TextEncounter(new TextDump(info))]);
    }

    export function getBookText(...pages: string[]): ITextManager {
        let dump = new TextDump(pages[pages.length - 1]);
        for (let i = pages.length - 2; i >= 0; i--) {
            let choice = new TextPrompt("Keep reading?", [
                new TextOption("Yes", dump),
                new TextOption("No")
            ]);
            dump = new TextDump(pages[i], choice);
        }
        return new TextManager([new TextEncounter(dump)]);
    }

    export function getDialog(key: Texts): ITextManager {
        switch (key) {
            case Texts.ALBERT_FIRST:
                return getAlbertText();
            case Texts.GRANDPA:
                return getGrandpaText();
            case Texts.SIGHING:
                return new TextManager([new TextEncounter(new TextDump("Sigh...", new TextDump("This time of year always reminds me of when Sarah left.")))]);
            case Texts.MEEP_GROWL:
                return getTheMeepText();
            case Texts.STANLEY:
                return getStanleyText();
            case Texts.PROFESSOR:
                return getProfessorText();
            case Texts.BLUMPUS:
                return getBlumpusText();
            case Texts.TUTORIAL_SIGN:
                return new TextManager([
                    new TextEncounter(new TextDump("Use S to scroll down, and W to scroll up. When you reach the bottom, press O (the letter) to continue. " +
                        " use WASD to move and O (the letter) to interact with things."), true),
                    new TextEncounter(new TextDump("Use S to scroll down, and W to scroll up. When you reach the bottom, press O (the letter) to continue. " +
                        " use WASD to move and O (the letter) to interact with things."))
                ]);
            case Texts.TUTORIAL_PERSON:
                let finish = (main: Main, parent: Entity, result?: string) => {
                    if (result === "Here you go.") {
                        main.groups.barriers.filter(b => b instanceof Gate)[0].sprite.destroy();
                        WorldManager.getInstance().changeLayout(9, main.island.getAdjustedPosition(pof(4, 4)), " ");
                    }
                };
                let decision = (lastViewed: number, main: Main, parent: Entity, lastResult?: string) => {
                    if (lastViewed === -1) {
                        return 0;
                    }
                    if (lastViewed === 0) {
                        return lastResult === "Suit yourself." ? 0 : 1;
                    }
                    return 1;
                };
                return new TextManager([
                    new TextEncounter(new TextDump("When you are given a prompt, use A and D to view your options, and O to select an option after you have read the entire prompt.",
                        new TextPrompt("Would you like me to open this gate?", [
                            new TextOption("No.", new TextDump("Suit yourself.")),
                            new TextOption("Yes please.", new TextDump("Here you go."))
                        ])), false, finish),
                    new TextEncounter(new TextDump("Go on ahead then."))
                ], decision);
            case Texts.MONSTER:
                let monsFin = (main: Main, parent: Entity, result?: string) => {
                    let monster = parent as Monster;
                    monster.doMouth();
                };
                return new TextManager([
                    new TextEncounter(new TextDump("Don't let them all die, Rosie."), false, monsFin)
                ]);
            case Texts.INTERLUDE:
                return new TextManager([new TextEncounter(new TextDump("What was that?", new TextDump("...",
                new TextDump("Oh, I guess it was just a dream. But I feel like I've seen that thing before somewhere."))))]);
            case Texts.ANIMAL_BEHAVIOR:
                return getBookText("Creature Behavior: Section 25 - The Blumpus", "A blumpus is a stubborn creature that demands a high level of respect from its owner. " +
                "If properly managed a Blumpus' natural charge can be used a power a home for at least two people. In order to stabilize its large body, the Blumpus contains two " + 
                "gyroscopic organs which spin in opposite directions. If kept on their natural diet of Bigberries, these organs will spin fast enough to act as generators.", 
                "When a mother Blumpus feeds its children the first child to take a bite will be badly beaten afterwards. Usually these beatings will continue until only one or two offspring remain. " + 
                "This selects for the children with the greatest patience or intelligence. Despite the initial frailness of the surviving children in comparison to their more eager siblings " + 
                "eventually they will grow to be massive and fit.", "Blumpuses are most vulnerable during sleep when their usually rock hard skin softens to be repaired. In order to defend themselves " + 
                "they have adapted to become sensitive to loud sounds, and to become very aggressive when they are woken.",
                "If you are unlucky enough to wake a Blumpus, you will have to dance with it. Importantly, you must use the opposite directions that the Blumpus uses. For example, if the Blumpus goes " + 
                "UP, you must press DOWN on the corresponding beat, or if the Blumpus goes LEFT, you must press RIGHT on the corresponding beat.");
            case Texts.PARK_BOOK:
                return getBookText("Walking through the park here I encountered a new kind of creature I've never seen before. I couldn't quite figure out its rhythms and how to subdue it, so I was left with some bad shocks.",
                "I also saw some motion over the hedges, and I believe there could be many more of them. Nevertheless I have to venture further in to try to turn on the recording technology that I set up with the professor yesterday.",
                "In spite of my conscience I feel driven to pursue the excitement of science and discovery over my own well being. Oh well, I hope R & S will understand.",
                "I am leaving this here. If you find this take it as a warning to not go any further than this unless you are as silly as me.");
            case Texts.WARNING_BOOK:
                return getBookText("There is another type of creature here as well. It is terrifying, with six legs and large, elaborate ears. During my face to face encounter with one I was not able to figure out how to defeat it, and this has left one of my legs badly injured.",
                "However, I have found that despite these \"ears\" they can be snuck by easily if I am not in their field of vision. This shall be my strategy from now on.",
                "I am now determined to go further in not only to set up the recording devices, but because I believe the appearance of these strange creatures may be related to the coming of the Beasts. It could be a breakthrough.");
            default:
                throw new Error(`Cannot find dialog for key '${key}'.`);
        }
    }
}