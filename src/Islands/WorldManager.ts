module MyGame {

    function loadIsland(num: number): Island {
        switch (num) {
            case 0:
                return new Island(0,
                    new Phaser.Point(0, 0),
                    [
                        "ooooooooooooooooooooooooo",
                        "o                       o",
                        "o                       o",
                        "o                       o",
                        "o          h            o",
                        "o                       o",
                        "o                       o",
                        "o                       o",
                        "o                       o",
                        "o                       o",
                        "o                       o",
                        "o          s            o",
                        "o                       o",
                        "o                       o",
                        "o                       o",
                        "o                       o",
                        "o      e                o",
                        "o                       o",
                        "o                   n   o",
                        "o                       o",
                        "o                       o",
                        "o                       o",
                        "o                       o",
                        "ooooooooooooooooooooooooo"
                    ],
                    [],
                    [
                        { position: new Phaser.Point(11, 11), key: "mrDorpnersHouse" },
                        { position: new Phaser.Point(20, 18), key: "sample" }
                    ],
                    [
                        { type: Assets.Sprites.JamBotWorld.key, position: pof(7, 16), script: "bbff" }
                    ],
                    [
                        { type: Assets.Sprites.OldMan.key, position: pof(20, 18), textKey: "sample", script: "lluurrbb" }
                    ],
                    pof(13, 13)
                );
        }
        throw new Error(`No island defined for number ${num}.`);
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
            console.log(this.islands[islandNum].layout);
        }
    }
}