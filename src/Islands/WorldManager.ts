module MyGame {

    function loadIsland(num: number): Island {
        switch (num) {
            case 0:
                return new IslandBuilder(0, IslandType.OUTSIDE)
                    .setLayout([
                        "              ",
                        "              ",
                        "       w      ",
                        "    wwwwwwww  ",
                        "       w n w  ",
                        "       w   w  ",
                        "       w   w  ",
                        "           w  ",
                        "  wwwwwwwwww  ",
                        "              ",
                        "              "
                    ])
                    .setNPCs([
                        { position: pof(9, 4), type: Assets.Sprites.OldMan.key, textKey: "oldman", script: "rr   ll   " }
                    ])
                    .setPlayerStart(pof(1, 1))
                    .setOutsideBoundsPortals([
                        { side: Direction.Up, start: 0, end: 14, link: 1, playerStart: pof(2, 2) }
                    ])
                    .build();
            case 1:
                return new IslandBuilder(1, IslandType.INSIDE)
                    .setLayout([
                        "     ",
                        "     ",
                        "     ",
                        "     ",
                        "     ",
                        "     ",
                        "     ",
                        "     ",
                        "  d  "
                    ])
                    .setLinks([{ pos: pof(2, 8), link: 0, playerStart: undefined }])
                    .setPlayerStart(pof(2, 5))
                    .build();
            default:
                throw new Error(`No island defined for number ${num}.`);
        }
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
            console.log(this.islands);
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

        exportLayouts() {
            let layouts = [] as Layout[];
            for (let i = 0; i < this.islands.length; i++) {
                if (this.islands[i]) {
                    let copy = JSON.parse(JSON.stringify(this.islands[i].layout));
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
    }
}