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
            return thing !== undefined && thing !== null;
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
            let workingPage = ["","",""];
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
    }
}