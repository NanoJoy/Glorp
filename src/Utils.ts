module MyGame {
    export class Tuple<T1, T2> {
        public item1: T1;
        public item2: T2;

        constructor(item1: T1, item2: T2) {
            this.item1 = item1;
            this.item2 = item2;
        }
    }

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

        static hasNeighboringChar(layout: string[], x: number, y: number, char: string) {
            if (char.length !== 1) {
                throw new Error("char must be a single character.");
            }
            return (y > 0 && layout[y - 1][x] === char) ||
                (y < layout.length - 1 && layout[y + 1][x] === char) ||
                (x > 0 && layout[y][x - 1] === char) ||
                (x < layout[y].length && layout[y][x + 1] === char);
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
            let divided = point.clone().divide(TILE_WIDTH, TILE_HEIGHT);
            return pof(Math.round(divided.x), Math.round(divided.y));
        }

        static tileisClear(x: number, y: number, main: Main): boolean {
            debugger;
            let layout = main.island.layout;
            let width = layout[0].length;
            if (layout.some(r => r.length !== width)) {
                throw new Error("All rows of layout must have same length.");
            }
            if (x > width - 1 || y > layout.length) {
                return false;
            }
            let tile = layout[y].charAt(x);
            if (tile === " ") {
                return true;
            }
            if (tile === "x") {
                let matching = main.groups.barriers.filter(b => b.position.x === x && b.position.y === y)[0];
                return !matching.playerCollides;
            }
            return false;
        }

        static sees(position: Phaser.Point, obj: Phaser.Point, visionRange: number, blockers: Phaser.Line[]): Tuple<boolean, boolean> {
            let seesHorizontal = true;
            let seesVertical = true;
            let distance = obj.clone().subtract(position.x, position.y);
            let absDistance = pof(Math.abs(distance.x), Math.abs(distance.y));

            let lineOfSight = new Phaser.Line(position.x, position.y, obj.x, obj.y);
            if (this.isAThing(blockers) && blockers.some(b => b.intersects(lineOfSight, true) !== null)) {
                seesHorizontal = false;
                seesVertical = false;
            }
            
            if (this.isAThing(visionRange)) {
                let transformedRange = pof(TILE_WIDTH, TILE_HEIGHT).multiply(visionRange, visionRange);
                seesHorizontal = seesHorizontal  && absDistance.y <= transformedRange.y;
                seesVertical = seesVertical && absDistance.x <= transformedRange.x;
            }

            return new Tuple(seesHorizontal, seesVertical);
        }

        static moveToTarget(body: Phaser.Physics.Arcade.Body, target: Phaser.Point, speed: number, cutoff: number, sees: Tuple<boolean, boolean>) {
            let distance = target.clone().subtract(body.x, body.y);
            let absDistance = pof(Math.abs(distance.x), Math.abs(distance.y));

            if (absDistance.x < cutoff) {
                body.position.x = target.x;
                body.velocity.x = 0;
                sees.item1 = false;
            }
            if (absDistance.y < cutoff) {
                body.position.y = target.y;
                body.velocity.y = 0;
                sees.item2 = false;
            }

            body.velocity.x = sees.item1 ? this.signOf(distance.x) * speed : 0;
            body.velocity.y = sees.item2 && !sees.item1 ? this.signOf(distance.y) * speed : 0;
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

        static moveInDirection(body: Phaser.Physics.Arcade.Body, direction: Direction, speed: number) {
            switch(direction) {
                case Direction.Up:
                    body.velocity.setTo(0, speed * -1);
                    break;
                case Direction.Right:
                    body.velocity.setTo(speed, 0);
                    break;
                case Direction.Down:
                    body.velocity.setTo(0, speed);
                    break;
                case Direction.Left:
                    body.velocity.setTo(speed * -1, 0);
                    break;
            }
        }

        static getEdgeDistance(sp1: Phaser.Sprite, sp2: Phaser.Sprite): number {
            function haveOverlap(begin1: number, end1: number, begin2: number, end2: number) {
                return (begin2 <= begin1 && begin1 <= end2) || (begin1 <= begin2 && begin2 <= end1);
            }

            if (haveOverlap(sp1.left, sp1.right, sp2.left, sp2.right)) {
                if (haveOverlap(sp1.top, sp1.bottom, sp2.top, sp2.bottom)) {
                    return 0;
                }
                if (sp1.top < sp2.top) {
                    return sp2.top - sp1.bottom;
                } 
                return sp1.top - sp2.bottom;
            }

            if (haveOverlap(sp1.top, sp1.bottom, sp2.top, sp2.bottom)) {
                if (sp1.left < sp2.left) {
                    return sp2.left - sp1.right;
                }
                return sp1.left - sp2.right;
            }

            if (sp1.left < sp2.left) {
                if (sp1.top < sp2.top) {
                    return Math.max(sp2.top - sp1.bottom, sp2.left - sp1.right);
                }
                return Math.max(sp1.top - sp2.bottom, sp2.left - sp1.right);
            }
            
            if (sp1.top < sp2.top) {
                return Math.max(sp2.top - sp1.bottom, sp1.left - sp2.right);
            }
            return Math.max(sp1.top - sp2.bottom, sp1.left - sp2.right);
        }

        static getHouseStart(x: number, y: number): Phaser.Point {
            return pof(x + 4, y + 7);
        }
    }
}