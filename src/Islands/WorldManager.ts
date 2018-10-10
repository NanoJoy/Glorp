module MyGame {

    function loadIsland(num: number): Island {
        if (!islandGetters[num]) {
            throw new Error(`No island defined for number ${num}.`);
        }
        return islandGetters[num]();
    }

    export class Location {
        island: number;
        x: number;
        y: number;
    }

    export class Dialogs {
        num: number;
        dialogs: DialogState[];
    }

    export class Layout {
        num: number;
        layout: string[];
    }

    export class WorldManager {
        private islands: Island[];
        private static instance: WorldManager;

        private constructor() {
            this.islands = [] as Island[];
        }

        static getInstance() {
            return this.instance || (this.instance = new WorldManager());
        }

        getIsland(num: number) {
            if (num < 0) {
                throw new Error("num must be non-negative.");
            }
            while (this.islands.length < num - 1) {
                this.islands.push(null);
            }
            return this.islands[num] || (this.islands[num] = loadIsland(num));
        }

        changeLayout(islandNum: number, position: Phaser.Point, symbol: string) {
            this.getIsland(islandNum);
            if (symbol.length > 1) {
                throw new Error("symbol must be a single character.");
            }
            var oldRow = this.islands[islandNum].layout[position.y]
            this.islands[islandNum].layout[position.y] = `${oldRow.substring(0, position.x)}${symbol}${oldRow.substring(position.x + 1)}`;
        }

        exportLayouts(): Layout[] {
            let layouts = [] as Layout[];
            for (let i = 0; i < this.islands.length; i++) {
                if (this.islands[i]) {
                    let copy = this.islands[i].layout.slice();
                    layouts.push({ num: i, layout: copy })
                }
            }
            return layouts;
        }

        importLayouts(layouts: Layout[]) {
            layouts.forEach(l => {
                this.getIsland(l.num).layout = l.layout;
            });
        }

        exportDialogs(): Dialogs[] {
            let dialogs = [] as Dialogs[];
            for (let i = 0; i < this.islands.length; i++) {
                if (this.islands[i]) {
                    dialogs.push({ num: i, dialogs: this.islands[i].getDialogStates() });
                }
            }
            return dialogs;
        }

        importDialogs(main: Main, dialogs: Dialogs[]) {
            dialogs.forEach(ds => {
                let island = this.getIsland(ds.num);
                ds.dialogs.forEach(d => {
                    island.saveDialogState(d.x, d.y, d.lastViewed);
                });
            });
        }
    }
}