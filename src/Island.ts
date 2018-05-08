module MyGame {

    class LayoutAddition {
        public tile: string;
        public x: number;
        public y: number;
    }

    export class Island {
        layout: string[];
        additions: LayoutAddition[];

        constructor(layout: string[], additions: LayoutAddition[]) {
            this.layout = layout;
            this.additions = additions;
        }
    }


}