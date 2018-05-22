module MyGame {
    export class BottomTextDisplay implements TextDisplay {
        game: Phaser.Game;
        sprite: Phaser.Sprite;
        name: string;
        firstPage: TextPage;
        currentPage: TextPage;
        isDisplaying: boolean;

        constructor(game: Phaser.Game, name: string) {
            this.game = game;
            this.name = name;
            this.firstPage = getDialogue(name);
        }

        scrollPage: (direction: Direction) => void;
        start: () => void;
    }
}