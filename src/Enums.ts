module MyGame {
    export enum Direction {
        Left, Right, Up, Down
    }

    export enum Diagonal {
        SW, NE, NW, SE
    }

    export enum TransferReason {
        NONE, LINK, DEATH, VICTORY
    }

    export enum ProjectileState {
        WAITING = "WAITING", FLYING = "FLYING", AFTER_FLYING = "AFTER_FLYING", DONE = "DONE"
    }
}