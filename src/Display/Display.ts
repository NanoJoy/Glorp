module MyGame {
    export interface Display {
        bringToTop: () => void;
        hide: () => void;
        show: () => void;
    }
}