module MyGame {
    export enum Direction {
        Left, Right, Up, Down
    }

    export enum Diagonal {
        SW, NE, NW, SE
    }

    export enum TransferReason {
        NONE, LINK, DEATH, VICTORY, INTERLUDE
    }

    export enum ProjectileState {
        WAITING, FLYING, AFTER_FLYING, DONE
    }
}