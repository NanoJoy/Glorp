module MyGame {
    export interface IItemManager {
        changeItem(type: string, amount: number): void;
        getItem(main: Main, x: number, y: number, direction: Direction): Holdable;
        useItem(main: Main, x: number, y: number, direction: Direction): number;
        dropItems(main: Main, x: number, y: number, direction: Direction): void;
        update(): void;
        getCount(): number;
        peekItem(): Holdable;
    }

    export class ItemManager implements IItemManager {
        private count: number;
        private currentType: string;
        private currentItem: Holdable;

        constructor() {
            this.count = 0;
        }

        getCount(): number {
            return this.count;
        }

        changeItem(type: string, amount: number): void {
            this.count = amount;
            this.currentType = type;
            this.currentItem = null;
        }

        getItem(main: Main, x: number, y: number, direction: Direction): Holdable {
            if (this.count === 0) {
                return null;
            }
            switch (this.currentType) {
                case Assets.Sprites.Airhorn.key:
                    if (!this.currentItem) {
                        this.currentItem = new Airhorn(main, x, y);
                    }
                    break;
                case Crumbs.type:
                    this.currentItem = new Crumbs(main, x, y, direction);
                    break;
                case Assets.Sprites.Grodule.key:
                    this.currentItem = new Grodule(main, x, y);
                    break;
                default:
                    throw new Error(`Item type ${this.currentType} is invalid.`);
            }
            return this.currentItem;
        }

        useItem(main: Main, x: number, y: number, direction: Direction): number {
            if (this.count === 0) {
                return;
            }
            let amount = this.getItem(main, x, y, direction).use(direction);
            this.count = Math.max(this.count - amount, 0);
            return amount;
        }

        dropItems(main: Main, x: number, y: number, direction: Direction): void {
            let item = this.getItem(main, x, y, direction);
            if (item && item.drop() > 0) {
                this.count = 0;
                this.currentItem = null;
            }
        }

        update(): void {
            if (this.currentItem && this.currentItem.inUse) {
                this.currentItem.update();
            }
        }

        peekItem(): Holdable {
            return this.currentItem;
        }
    }

    export interface Holdable {
        main: Main;
        startPosition: Phaser.Point;
        iconKey: string;
        inUse: boolean;
        drop: () => number;
        use: (direction: Direction) => number;
        update: () => void;
    }
}