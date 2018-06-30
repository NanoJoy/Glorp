module MyGame {

    class LayoutAddition {
        public tile: string;
        public x: number;
        public y: number;
    }

    export class Island {
        position: Phaser.Point;
        layout: string[];
        additions: LayoutAddition[];
        movementScripts: MovementScript[];

        constructor(position: Phaser.Point, layout: string[], additions: LayoutAddition[], movementScripts: MovementScript[]) {
            this.position = position;
            this.layout = layout;
            this.additions = additions;
            this.movementScripts = movementScripts;
        }

        getMovementScript(x: number, y: number): MovementScript {
            var matching =  this.movementScripts.filter(script => script.start.x === x && script.start.y === y);
            return matching.length > 0 ? matching[0] : null;
        }
    }

    
    export var island1 = new Island(
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
        )]
    );
}