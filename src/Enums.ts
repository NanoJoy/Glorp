module MyGame {
    export enum Direction {
        Forward, Back, Left, Right, Up, Down
    }

    export enum Diagonal {
        SW, NE, NW, SE
    }

    export enum TransferReason {
        NONE, LINK, DEATH, VICTORY
    }
}