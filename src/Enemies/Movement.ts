module MyGame {
    export class MovementScript {
        start: Phaser.Point;
        directions: Direction[];
        speed: number;
        loop: boolean;

        constructor(start: Phaser.Point, directions: Direction[], speed: number, loop = true) {
            this.start = start;
            this.directions = directions;
            this.speed = speed;
            this.loop = loop;
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

        constructor(game: Phaser.Game, script: MovementScript, sprite: Phaser.Sprite) {
            this.game = game;
            this.script = script;
            this.sprite = sprite;
            this.readyForNext = false;
            this.paused = false;
        }

        start(resetToOriginalPosition = false) {
            if (resetToOriginalPosition) {
                this.sprite.position.setTo(this.script.start.x * TILE_WIDTH, this.script.start.y * TILE_HEIGHT);
            }
            let destinations = [] as Phaser.Point[];
            for (let i = 0; i < this.script.directions.length; i++) {
                let lastPosition = i === 0 ? this.sprite.position : destinations[i - 1];
                switch (this.script.directions[i]) {
                    case Direction.Left:
                        destinations.push(new Phaser.Point(lastPosition.x - TILE_WIDTH, lastPosition.y));
                        break;
                    case Direction.Right:
                        destinations.push(new Phaser.Point(lastPosition.x + TILE_WIDTH, lastPosition.y));
                        break;
                    case Direction.Forward:
                    case Direction.Up:
                        destinations.push(new Phaser.Point(lastPosition.x, lastPosition.y - TILE_HEIGHT));
                        break;
                    case Direction.Back:
                    case Direction.Down:
                        destinations.push(new Phaser.Point(lastPosition.x, lastPosition.y + TILE_HEIGHT));
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
                    return;
                }
            }
            let nextDest = this.destinations[this.currentNum];
            this.currentTween = this.game.add.tween(this.sprite.body.position).to({x: nextDest.x, y: nextDest.y}, this.script.speed, Phaser.Easing.Linear.None, true);
            this.currentTween.onComplete.add(this.onTweenComplete, this);
        }

        onTweenComplete() {
            this.readyForNext = true;
            this.currentNum++;
            this.playNext(true);
        }

        pause() {
            this.currentTween.pause();
            this.paused = true;
        }

        resume() {
            if (!this.paused) {
                return;
            }
            this.currentTween.resume();
            this.paused = false;
        }
    }
}