module MyGame {

    function loadIsland(num: number): Island {
        switch (num) {
            case 0:
                return new Island(
                    new Phaser.Point(0, 0),
                    [
                        "oooooooooooooooo",
                        "oooooooooooooooo",
                        "ooo/        'ooo",
                        "oo/      j   'oo",
                        "oo            oo",
                        "oo'          /oo",
                        "ooo'       /oooo",
                        "ooooooo  ooooooo",
                        "ooooooo  ooooooo",
                        "oooooooooooooooo",
                    ],
                    [],
                    [new MovementScript(
                        new Phaser.Point(9, 3),
                        [Direction.Back, Direction.Back, Direction.Forward, Direction.Forward],
                        500
                    )],
                    new Phaser.Point(5, 6)
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
    }
}