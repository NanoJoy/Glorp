module MyGame {

    class LayoutAddition {
        public tile: string;
        public x: number;
        public y: number;
    }

    class TextKey {
        key: string;
        position: Phaser.Point;
    }

    export class Island {
        num: number;
        position: Phaser.Point;
        layout: string[];
        additions: LayoutAddition[];
        movementScripts: MovementScript[];
        textKeys: TextKey[];
        playerStart: Phaser.Point;

        constructor(num: number, position: Phaser.Point, layout: string[], additions: LayoutAddition[], movementScripts: MovementScript[], textKeys: TextKey[], playerStart: Phaser.Point) {
            this.num = num;
            this.position = position;
            this.layout = layout;
            this.additions = additions;
            this.movementScripts = movementScripts;
            this.textKeys = textKeys;
            this.playerStart = playerStart;
        }

        getMovementScript(x: number, y: number): MovementScript {
            var matching =  this.movementScripts.filter(script => script.start.x === x && script.start.y === y);
            return matching.length > 0 ? matching[0] : null;
        }

        getTextKey(x: number, y: number): string {
            var matching =  this.textKeys.filter(key => key.position.x === x && key.position.y === y);
            return matching.length > 0 ? matching[0].key : null;
        }
    }
}