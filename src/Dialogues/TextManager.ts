module MyGame {
    export interface ITextManager {
        getNext(main: Main, parent: Entity): ITextEncounter;
        useNext(main: Main, parent: Entity): ITextEncounter;
        setLastViewed(lastViewed: number): void;
    }

    export class TextManager implements ITextManager {
        private textEncounters: ITextEncounter[];
        private lastViewed: number;
        private decisionFunction: (lastViewed: number, main: Main, parent: Entity, lastResult?: string) => number;

        constructor(textEncounters: ITextEncounter[], decisionFunction = null as (lastViewed: number, main: Main, parent: Entity, lastResult?: string) => number) {
            this.textEncounters = textEncounters;
            this.lastViewed = -1;
            if (!decisionFunction) {
                this.decisionFunction = function (lastViewed: number, main: Main, parent: Entity, lastResult?: string) {
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
            let current = this.textEncounters[this.lastViewed];
            return this.textEncounters[this.decisionFunction(this.lastViewed, main, parent, current ? current.lastResult : undefined)];
        }

        useNext(main: Main, parent: Entity) {
            let current = this.textEncounters[this.lastViewed];
            this.lastViewed = this.decisionFunction(this.lastViewed, main, parent, current ? current.lastResult : undefined);
            main.island.saveDialogState(parent.position.x, parent.position.y, this.lastViewed);
            return this.textEncounters[this.lastViewed];
        }

        setLastViewed(lastViewed: number) {
            this.lastViewed = lastViewed;
        }
    }
}