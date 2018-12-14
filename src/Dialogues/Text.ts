module MyGame {
    export class TextOption {
        text: string;
        response: TextPage;

        constructor(text: string, response: TextPage = null) {
            let maxLength = 19;
            if (text.length > maxLength) {
                throw new Error(`Option '${text}' has more than ${maxLength} characters.`);
            }
            this.text = text;
            this.response = response;
        }
    }

    export interface TextPage {
        text: string[];
        hasOptions: boolean;
    }

    export class TextPrompt implements TextPage {
        text: string[];
        hasOptions: boolean;
        options: TextOption[];

        constructor(text: string, options: TextOption[]) {
            this.text = Utils.splitTextIntoPages(text);
            if (options.length < 1) {
                throw Error("Must be at least 1 option.");
            }
            this.hasOptions = true;
            this.options = options;
        }
    }

    export class TextDump implements TextPage {
        text: string[];
        hasOptions: boolean;
        next: TextPage;
        
        constructor(text: string, next = null as TextPage) {
            this.text = Utils.splitTextIntoPages(text);
            this.hasOptions = false;
            this.next = next;
        }
    }

    export interface ITextEncounter {
        autoStart: boolean;
        lastResult: string;
        getCurrentPage: () => TextPage;
        onFinish: (main: Main, parent: Entity, result?: string) => void;
        getResponse: (selected: number) => TextPage;
        isFinished: () => boolean;
        reset: () => void;
    }

    export class TextEncounter implements ITextEncounter {
        autoStart: boolean;
        lastResult: string;
        private currentPage: TextPage;
        private startPage: TextPage;
        onFinish: (main: Main, parent: Entity, result?: string) => void;

        constructor(startPage: TextPage, autoStart = false, onFinish = function (main: Main, parent: Entity, result?: string) {}) {
            this.currentPage = startPage;
            this.startPage = startPage;
            this.autoStart = autoStart;
            this.onFinish = onFinish.bind(this);
        }

        getCurrentPage() {
            return this.currentPage;
        }

        getResponse(selected: number) {
            if (!this.currentPage.hasOptions) {
                return (this.currentPage = (this.currentPage as TextDump).next);
            }
            return (this.currentPage = (this.currentPage as TextPrompt).options[selected].response);
        }

        isFinished() {
            return this.currentPage === null;
        }

        reset() {
            this.currentPage = this.startPage;
        }
    }

    export interface TextDisplay {
        game: Main;
        name: string;
        textEncounter: ITextEncounter;
        isDisplaying: boolean;
        scrollPage: (direction: Direction) => void;
        start: (textEncounter: ITextEncounter) => void;
    }
}