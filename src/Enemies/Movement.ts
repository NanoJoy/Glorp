module MyGame {
    export interface IMovementManager {
        pause(): void;
        resume(): void;
    }

    export interface Moveable {
        sprite: Phaser.Sprite;
        direction: Direction;
        readonly speed: number;
    }

    export class MovementScript {
        start: Phaser.Point;
        directions: Direction[];
        loop: boolean;
        triggerName: string;

        constructor(start: Phaser.Point, directions: Direction[], loop = true, triggerName?: string) {
            this.start = start;
            this.directions = directions;
            this.loop = loop;
            this.triggerName = triggerName;
        }
    }

    export class MovementManager implements IMovementManager {
        game: Phaser.Game;
        script: MovementScript;
        sprite: Phaser.Sprite;
        destinations: Phaser.Point[];
        currentNum: number;
        currentTween: Phaser.Tween;
        readyForNext: boolean;
        paused: boolean;
        loop: boolean;
        hasTrigger: boolean;
        triggerName: string;
        interruptable: boolean;
        private onComplete: () => void;
        private onCompleteContext: object;
        private onCompleteArgs: any[];
        private obj: Moveable;
        private tileOffset: Phaser.Point;

        constructor(game: Phaser.Game, script: MovementScript, obj: Moveable) {
            this.game = game;
            this.script = script;
            this.obj = obj;
            this.sprite = obj.sprite;
            this.readyForNext = false;
            this.paused = false;
            this.triggerName = script.triggerName;
            this.hasTrigger = this.triggerName && this.triggerName !== "";
            this.currentNum = -1;
            this.interruptable = true;
            this.tileOffset = pof(0, 0);
        }

        start(resetToOriginalPosition = false) {
            if (resetToOriginalPosition) {
                this.sprite.position.setTo((this.script.start.x + this.tileOffset.x) * TILE_WIDTH, (this.script.start.y + this.tileOffset.y) * TILE_HEIGHT);
                if (this.sprite.body) {
                    this.sprite.body.position.setTo((this.script.start.x + this.tileOffset.x) * TILE_WIDTH, (this.script.start.y + this.tileOffset.y) * TILE_HEIGHT);
                }
            }
            let destinations = [] as Phaser.Point[];
            for (let i = 0; i < this.script.directions.length; i++) {
                let lastPosition = i === 0 ? this.sprite.position : destinations[i - 1];
                switch (this.script.directions[i]) {
                    case null:
                        destinations.push(pof(lastPosition.x, lastPosition.y));
                        break;
                    case Direction.Left:
                        destinations.push(pof(lastPosition.x - TILE_WIDTH, lastPosition.y));
                        break;
                    case Direction.Right:
                        destinations.push(pof(lastPosition.x + TILE_WIDTH, lastPosition.y));
                        break;
                    case Direction.Up:
                        destinations.push(pof(lastPosition.x, lastPosition.y - TILE_HEIGHT));
                        break;
                    case Direction.Down:
                        destinations.push(pof(lastPosition.x, lastPosition.y + TILE_HEIGHT));
                        break;
                }
            }
            this.destinations = destinations;
            this.currentNum = 0;
            this.playNext(true);     
        }

        playNext(overrideCurrentTween = false) {
            if (!overrideCurrentTween && !this.readyForNext) {
                return;
            }
            this.readyForNext = false;
            if (this.currentNum === this.destinations.length) {
                this.currentNum = 0;
                if (!this.script.loop) {
                    this.currentNum = -1;
                    this.interruptable = true;
                    if (this.onComplete) {
                        this.onComplete.call(this.onCompleteContext, this.onCompleteArgs);
                    }
                    return;
                }
            }
            this.obj.direction = Utils.isAThing(this.script.directions[this.currentNum]) ? this.script.directions[this.currentNum] : this.obj.direction;
            let nextDest = this.destinations[this.currentNum];
            let speed = isVertical(this.script.directions[this.currentNum]) ? this.obj.speed * (TILE_WIDTH / TILE_HEIGHT) : this.obj.speed;
            this.currentTween = this.game.add.tween(this.sprite.body.position).to({x: nextDest.x, y: nextDest.y}, speed, Phaser.Easing.Linear.None, true);
            this.currentTween.onComplete.add(this.onTweenComplete, this);
        }

        setOnComplete(onComplete: () => void, onCompleteContext: object, ...onCompletArgs: any[]) {
            this.onComplete = onComplete;
            this.onCompleteContext = onCompleteContext;
            this.onCompleteArgs = onCompletArgs;
        }

        onTweenComplete() {
            this.readyForNext = true;
            this.currentNum++;
            this.playNext(true);
        }

        pause() {
            if (this.paused || this.currentNum === -1) {
                return;
            }
            this.currentTween.pause();
            this.paused = true;
        }

        resume() {
            if (!this.paused || this.currentNum === -1) {
                return;
            }
            this.obj.direction = Utils.isAThing(this.script.directions[this.currentNum]) ? this.script.directions[this.currentNum] : this.obj.direction;
            this.currentTween.resume();
            this.paused = false;
        }

        currentlyStationary() {
            return this.currentNum === -1 || this.script.directions[this.currentNum] === null;
        }

        setTileOffset(x: number, y: number) {
            this.tileOffset.setTo(x, y);
        }
    }
}