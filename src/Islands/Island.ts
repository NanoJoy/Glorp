module MyGame {

    class LayoutAddition {
        public tile: string;
        public x: number;
        public y: number;
    }

    export class Island {
        num: number;
        position: Phaser.Point;
        layout: string[];
        additions: LayoutAddition[];
        movementScripts: MovementScript[];
        playerStart: Phaser.Point;

        constructor(num: number, position: Phaser.Point, layout: string[], additions: LayoutAddition[], movementScripts: MovementScript[], playerStart: Phaser.Point) {
            this.num = num;
            this.position = position;
            this.layout = layout;
            this.additions = additions;
            this.movementScripts = movementScripts;
            this.playerStart = playerStart;
        }

        getMovementScript(x: number, y: number): MovementScript {
            var matching =  this.movementScripts.filter(script => script.start.x === x && script.start.y === y);
            return matching.length > 0 ? matching[0] : null;
        }
    }
}