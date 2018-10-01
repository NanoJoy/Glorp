module MyGame {
    export interface Moveable {
        sprite: Phaser.Sprite;
        direction: Direction;
        speed: number;
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

    export class MovementManager {
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
        private onComplete: () => void;
        private onCompleteContext: object;
        private onCompleteArgs: any[];
        private obj: Moveable;

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
        }

        start(resetToOriginalPosition = false) {
            if (resetToOriginalPosition) {
                this.sprite.position.setTo(this.script.start.x * TILE_WIDTH, this.script.start.y * TILE_HEIGHT);
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
                    case Direction.Forward:
                    case Direction.Up:
                        destinations.push(pof(lastPosition.x, lastPosition.y - TILE_HEIGHT));
                        break;
                    case Direction.Back:
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
                    if (this.onComplete) {
                        this.onComplete.call(this.onCompleteContext, this.onCompleteArgs);
                    }
                    return;
                }
            }
            this.obj.direction = this.script.directions[this.currentNum] ? this.script.directions[this.currentNum] : this.obj.direction;
            let nextDest = this.destinations[this.currentNum];
            this.currentTween = this.game.add.tween(this.sprite.body.position).to({x: nextDest.x, y: nextDest.y}, this.obj.speed, Phaser.Easing.Linear.None, true);
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
            if (this.paused) {
                return;
            }
            this.currentTween.pause();
            this.paused = true;
        }

        resume() {
            if (!this.paused || this.currentNum === -1) {
                return;
            }
            this.obj.direction = this.script.directions[this.currentNum];
            this.currentTween.resume();
            this.paused = false;
        }

        currentlyStationary() {
            return this.currentNum === -1 || this.script.directions[this.currentNum] === null;
        }
    }
}