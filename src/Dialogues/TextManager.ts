module MyGame {
    export interface ITextManager {
        getNext(main: Main, parent: Entity): ITextEncounter;
        useNext(main: Main, parent: Entity): ITextEncounter;
        setLastViewed(lastViewed: number): void;
    }

    export class TextManager implements ITextManager {
        private textEncounters: ITextEncounter[];
        private lastViewed: number;
        private decisionFunction: (lastViewed: number, main: Main, parent: Entity) => number;

        constructor(textEncounters: ITextEncounter[], decisionFunction = null as (lastViewed: number, main: Main, parent: Entity) => number) {
            this.textEncounters = textEncounters;
            this.lastViewed = -1;
            if (!decisionFunction) {
                this.decisionFunction = function (lastViewed: number, main: Main, parent: Entity) {
                    if (lastViewed < this.textEncounters.length - 1) {
                        return lastViewed + 1;
                    }
                    return lastViewed;
                }
            } else {
                this.decisionFunction = decisionFunction;
            }
        }

        getNext(main: Main, parent: Entity) {
            return this.textEncounters[this.decisionFunction(this.lastViewed, main, parent)];
        }

        useNext(main: Main, parent: Entity) {
            this.lastViewed = this.decisionFunction(this.lastViewed, main, parent);
            main.island.saveDialogState(parent.position.x, parent.position.y, this.lastViewed);
            return this.textEncounters[this.lastViewed];
        }

        setLastViewed(lastViewed: number) {
            this.lastViewed = lastViewed;
        }
    }
}