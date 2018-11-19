module MyGame {
    export function pof(x: number, y: number): Phaser.Point {
        return new Phaser.Point(x, y);
    }

    export function pcop(point: Phaser.Point): Phaser.Point {
        if (!point) {
            return point;
        }
        return pof(point.x, point.y);
    }

    export function isVertical(direction: Direction) {
        return direction === Direction.Up || direction === Direction.Down;
    }

    export class Utils {
        static fillString(s: string, len: number) {
            if (!s || s.length === 0) {
                throw new Error("s must be a non-empty string.");
            }
            if (len < 0) {
                throw new Error("len must be a non-negative number.");
            }
            var result = "";
            while (result.length < len) {
                result += s;
            }
            return result.substr(0, len);
        }

        static snapToPixels(sprite: Phaser.Sprite) {
            if (sprite.body.velocity.x < 0) {
                sprite.body.position.x = Math.floor(sprite.body.position.x / 2) * 2;
            } else {
                sprite.body.position.x = Math.ceil(sprite.body.position.x / 2) * 2;
            }
            if (sprite.body.velocity.y < 0) {
                sprite.body.position.y = Math.floor(sprite.body.position.y / 2) * 2;
            } else {
                sprite.body.position.y = Math.ceil(sprite.body.position.y / 2) * 2;
            }
        }

        static animationArray(start: number, finish: number): number[] {
            if (finish < start) {
                throw new Error("finish must be greater than or equal to start.");
            }
            let result = [];
            for (let i = start; i <= finish; i++) {
                result.push(i);
            }
            return result;
        }

        static isAThing(thing: any): boolean {
            return thing !== undefined && thing !== null && thing !== NaN;
        }

        static addPersonAnimations(sprite: Phaser.Sprite, speed = 5) {
            sprite.animations.add("walk_back", Utils.animationArray(1, 4), speed, true);
            sprite.animations.add("walk_forward", Utils.animationArray(6, 9), speed, true);
            sprite.animations.add("walk_right", Utils.animationArray(10, 13), speed, true);
            sprite.animations.add("walk_left", Utils.animationArray(14, 17), speed, true);
            sprite.animations.add("idle_back", [0], speed, true);
            sprite.animations.add("idle_forward", [5], speed, true);
            sprite.animations.add("idle_right", [10], speed, true);
            sprite.animations.add("idle_left", [14], speed, true);
        }

        static getIdleAnimName(direction: Direction): string {
            return `idle_${Utils.getDirectionName(direction)}`;
        }

        static getWalkingAnimName(direction: Direction): string {
            return `walk_${Utils.getDirectionName(direction)}`;
        }

        static getDirectionName(direction: Direction): string {
            switch (direction) {
                case null:
                    return null;
                case Direction.Down:
                    return "back";
                case Direction.Up:
                    return "forward";
                case Direction.Right:
                    return "right";
                case Direction.Left:
                    return "left";
                default:
                    throw new Error(`Direction ${direction} not supported.`);
            }
        }

        static splitTextIntoPages(text: string): string[] {
            let lettersInRow = 17;
            let rowsInPage = 3;
            let words = text.split(" ");
            let pages = [] as string[];
            let workingPage = ["", "", ""];
            let rowCount = rowsInPage;
            for (let i = 0; i < lettersInRow; i++) {
                workingPage[rowsInPage - 1] += "a";
            }
            for (let i = 0; i < words.length; i++) {
                let word = words[i];
                if (word.length > lettersInRow) {
                    throw new Error(`Word ${word} has more letters than allowed in row.`);
                }
                if (workingPage[rowCount - 1].length + word.length + 1 > lettersInRow) {
                    if (workingPage.length === rowsInPage) {
                        pages.push(workingPage.join(" "));
                        workingPage = [word];
                        rowCount = 1;
                    } else {
                        rowCount += 1;
                        workingPage[rowCount - 1] = word;
                    }
                } else {
                    workingPage[rowCount - 1] = workingPage[rowCount - 1] + " " + word;
                }
            }
            pages.push(workingPage.join(" "));
            pages.shift();
            return pages;
        }

        static surroundedByChar(layout: string[], x: number, y: number, char: string) {
            if (char.length !== 1) {
                throw new Error("char must be a single character.");
            }
            return (y === 0 || layout[y - 1][x] === char) &&
                (y === layout.length - 1 || layout[y + 1][x] === char) &&
                (x === 0 || layout[y][x - 1] === char) &&
                (x === layout[y].length || layout[y][x + 1] === char);
        }

        static makeMovementScript(position: Phaser.Point, script: string): MovementScript {
            if (!script) {
                return null;
            }
            if (script.indexOf("=") === -1) {
                return new MovementScript(position, makeDirections(script));
            }

            var loop = script.indexOf("l=") !== -1;
            if (loop) {
                loop = getValue("l") === "true";
            }

            var triggerName = "";
            if (script.indexOf("t=") === -1) {
                triggerName = null;
            } else {
                triggerName = getValue("t");
            }

            var directions = makeDirections(getValue("d"));
            return new MovementScript(position, directions, loop, triggerName);

            function getValue(key: string): string {
                var entries = script.split(";");
                return entries.map(e => e.split("=")).filter(e => e[0] === key).map(e => e[1])[0];
            }

            function makeDirections(directionsString: string) {
                return directionsString.toLocaleLowerCase().split("").map(c => getDirectionFromLetter(c));
            }

            function getDirectionFromLetter(letter: string): Direction {
                switch (letter) {
                    case " ":
                        return null;
                    case "u":
                        return Direction.Up;
                    case "d":
                        return Direction.Down;
                    case "l":
                        return Direction.Left;
                    case "r":
                        return Direction.Right;
                }
                throw new Error(`${letter} is not a valid direction char.`);
            }
        }

        static getEndPosition(start: Phaser.Point, directions: Direction[]): Phaser.Point {
            let end = start.clone();
            for (let i = 0; i < directions.length; i++) {
                switch (directions[i]) {
                    case Direction.Up:
                        end.y -= 1;
                        break;
                    case Direction.Down:
                        end.y += 1;
                        break;
                    case Direction.Left:
                        end.x -= 1;
                        break;
                    case Direction.Right:
                        end.x += 1;
                        break;
                }
            }
            if (end.x < 0 || end.y < 0) {
                throw new Error("End point of script would have negative value.");
            }
            return end;
        }

        static bpmToMilliseconds(bpm: number): number {
            return 60000 / bpm;
        }

        static roundToClosestTile(point: Phaser.Point) {
            return point.clone().divide(TILE_WIDTH, TILE_HEIGHT).round().multiply(TILE_WIDTH, TILE_HEIGHT);
        }

        static moveToTarget(body: Phaser.Physics.Arcade.Body, target: Phaser.Point, speed: number, cutoff: number, visionRange?: number, blockersLeft?: Phaser.Line[], blockersTop?: Phaser.Line[]) {
            debugger;
            let distance = target.clone().subtract(body.position.x, body.position.y);
            let absDistance = pof(Math.abs(distance.x), Math.abs(distance.y));
            let seesHorizontal = true;
            let seesVertical = true;
            let blockedH = (distance.x < 0 && body.blocked.left) || (distance.x > 0 && body.blocked.right);
            let blockedV = (distance.y < 0 && body.blocked.up) || (distance.y > 0 && body.blocked.down);

            let lineOfSight = new Phaser.Line(body.center.x, body.center.y, target.x, target.y);
            if (this.isAThing(blockersLeft)) {
                seesHorizontal = !blockersLeft.some(b => b.intersects(lineOfSight, true) !== null);
            }
            if (this.isAThing(blockersTop)) {
                seesVertical = !blockersTop.some(b => b.intersects(lineOfSight, true) !== null);
            }
            
            if (this.isAThing(visionRange)) {
                let transformedRange = pof(TILE_WIDTH, TILE_HEIGHT).multiply(visionRange, visionRange);
                seesHorizontal = seesHorizontal && !blockedH && absDistance.y <= transformedRange.y;
                seesVertical = seesVertical && !blockedV && absDistance.x <= transformedRange.x;
            }

            if (absDistance.x < cutoff) {
                body.position.x = target.x;
                body.velocity.x = 0;
                seesHorizontal = false;
            }
            if (absDistance.y < cutoff) {
                body.position.y = target.y;
                body.velocity.y = 0;
                seesVertical = false;
            }

            if (seesHorizontal && (blockedV || absDistance.x >= absDistance.y)) {
                body.velocity.x = this.signOf(distance.x) * speed;
            } else if (seesVertical && (blockedH || absDistance.y > absDistance.x)) {
                body.velocity.y = this.signOf(distance.y) * speed;
            }
        }

        static accelerateToTarget(target: number, currentPosition: number, currentVelocity: number, acceleration: number, maxSpeed?: number): number {
            let multiplier = 1;
            if (maxSpeed !== undefined && maxSpeed <= 0) {
                throw new Error(`maxSpeed must be positive. Given value: ${maxSpeed}.`);
            }
            if (isNaN(currentVelocity)) {
                currentVelocity = 0;
            }
            if (target < currentPosition) {
                multiplier = -1;
                currentPosition *= -1;
                currentVelocity *= -1;
            }
            
            let distance = Math.abs(target - currentPosition);
            if (distance < maxSpeed) {
                let calculated = multiplier * distance;
                return maxSpeed === undefined ? calculated
                    : multiplier === 1 ? Math.min(calculated, currentVelocity) : Math.max(calculated, currentVelocity);
            }

            let calculated = multiplier * (currentVelocity + acceleration);
            return maxSpeed === undefined ? calculated 
                : multiplier === 1 ? Math.min(calculated, maxSpeed) : Math.max(calculated, maxSpeed * -1);
        }

        static signOf(num: number) {
            return num < 0 ? -1 : num > 0 ? 1 : 0;
        }
    }
}