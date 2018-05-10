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

        constructor(x: number, y: number, layout: string[], additions: LayoutAddition[]) {
            this.position = new Phaser.Point(x, y);
            this.layout = layout;
            this.additions = additions;
        }
    }


}