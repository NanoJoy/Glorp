module MyGame {
    export class TextOption {
        text: string;
        response: TextPage;

        constructor(text: string, response: TextPage = null) {
            this.text = text;
            this.response = response;
        }
    }

    export interface TextPage {
        text: string[];
        hasOptions: boolean;
        onFinish: (selected: number) => void;
    }

    export class TextPrompt implements TextPage {
        text: string[];
        hasOptions: boolean;
        onFinish: (selected: number) => void;
        options: TextOption[];

        constructor(text: string[], options: TextOption[], onFinish: (selected: number) => void = null) {
            this.text = text;
            if (options.length < 1) {
                throw Error("Must be at least 1 option.");
            }
            this.hasOptions = true;
            this.options = options;
            this.onFinish = onFinish;
        }

        getNext(selected: number): TextPage {
            return this.options[selected].response;
        }
    }

    export class TextDump implements TextPage {
        text: string[];
        hasOptions: boolean;
        onFinish: (selected: number) => void;
        
        constructor(text: string[], onFinish: (selected: number) => void = null) {
            this.text = text;
            this.hasOptions = false;
            this.onFinish = onFinish;
        }
    }

    export interface TextDisplay {
        game: Main;
        name: string;
        firstPage: TextPage;
        currentPage: TextPage;
        isDisplaying: boolean;
        scrollPage: (direction: Direction) => void;
        start: () => void;
    }
}