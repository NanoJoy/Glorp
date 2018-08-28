module MyGame {
    export class TextManager {
        private textEncounters: ITextEncounter[];
        private lastViewed: number;
        private decisionFunction: (main: Main, parent: Entity) => number;

        constructor(textEncounters: ITextEncounter[], decisionFunction = null as (main: Main, parent: Entity) => number) {
            this.textEncounters = textEncounters;
            this.lastViewed = -1;
            if (!decisionFunction) {
                this.decisionFunction = function (main: Main, parent: Entity) {
                    if (this.lastViewed < this.textEncounters.length - 1) {
                        return this.lastViewed + 1;
                    }
                    return this.lastViewed;
                }
            }
        }

        getNext(main: Main, parent: Entity) {
            return this.textEncounters[this.decisionFunction(main, parent)];
        }

        useNext(main: Main, parent: Entity) {
            this.lastViewed = this.decisionFunction(main, parent);
            console.log(parent.position);
            main.island.saveDialogState(parent.position.x, parent.position.y, this.lastViewed);
            return this.textEncounters[this.lastViewed];
        }

        setLastViewed(lastViewed: number) {
            this.lastViewed = lastViewed;
        }
    }
}