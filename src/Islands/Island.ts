module MyGame {

    export enum IslandType {
        WATER, INSIDE, OUTSIDE
    }

    class LayoutAddition {
        public tile: string;
        position: Phaser.Point;
    }

    class TextKey {
        key: string;
        position: Phaser.Point;
    }

    class MapNPC {
        position: Phaser.Point;
        type: string;
        textKey: string;
        script: string;
    }

    class MapEnemy {
        position: Phaser.Point;
        type: string;
        script: string;
    }

    export class Island {
        num: number;
        type: IslandType;
        position: Phaser.Point;
        layout: string[];
        additions: LayoutAddition[];
        enemies: MapEnemy[];
        npcs: MapNPC[];
        playerStart: Phaser.Point;

        constructor(num: number, type: IslandType, layout: string[], additions: LayoutAddition[], enemies: MapEnemy[], npcs: MapNPC[], playerStart: Phaser.Point) {
            this.num = num;
            this.type = type;
            this.layout = layout;
            this.additions = additions;
            this.enemies = enemies;
            this.npcs = npcs;
            this.playerStart = playerStart;

            let paddingOffset = pof(0, 0);
            let padChar = this.getPadChar(type);
            let minWidth = SCREEN_WIDTH / TILE_WIDTH + 1;
            for (let i = 0; i < this.layout.length; i++) {
                for (let j = 0; j < minWidth; j++) {
                    this.layout[i] = padChar + this.layout[i] + padChar;
                    if (i === 0) {
                        paddingOffset.x += 1;
                    }
                }
            }
            let minHeight = SCREEN_HEIGHT / TILE_HEIGHT + 1;
            let padRow = Utils.fillString(padChar, this.layout[0].length);
            for (let i = 0; i < minHeight; i++) {
                this.layout.push(padRow);
                this.layout.unshift(padRow);
                paddingOffset.y += 1;
            }
            enemies.forEach(function (e) { e.position.add(paddingOffset.x, paddingOffset.y); });
            npcs.forEach(function (n) { n.position.add(paddingOffset.x, paddingOffset.y); });
            playerStart.add(paddingOffset.x, paddingOffset.y);
        }

        getNeighborhood(position: Phaser.Point): Neighborhood {
            return {
                above: position.y === 0 ? null : this.layout[position.y - 1][position.x],
                left: position.x === 0 ? null : this.layout[position.y][position.x - 1],
                right: position.x === this.layout[0].length - 1 ? null : this.layout[position.y][position.x + 1],
                below: position.y === this.layout.length - 1 ? null : this.layout[position.y + 1][position.x]
            };
        }

        makeGround(main: Main, position: Phaser.Point) {
            switch (this.type) {
                case IslandType.INSIDE:
                    return new TileFloor(main, position);
                case IslandType.WATER:
                case IslandType.OUTSIDE:
                    return new Grass(main, position);
            }
        }

        getEnemy(main: Main, pos: Phaser.Point): Enemy {
            var matching = this.enemies.filter(key => key.position.equals(pos));
            if (matching.length === 0) {
                console.log(this.enemies);
                throw new Error(`Could not find enemy information at x: ${pos.x}, y: ${pos.y}.`);
            }
            var enemy = matching[0];
            switch (enemy.type) {
                case Assets.Sprites.JamBotWorld.key:
                    return new JamBot(main, enemy.position, this.makeMovementScript(enemy.position, enemy.script));
            }
            throw new Error(`${enemy.type} is not a valid enemy type.`);
        }

        getNPC(main: Main, pos: Phaser.Point): NPC {
            var matching = this.npcs.filter(n => n.position.equals(pos));
            if (matching.length === 0) {
                console.log(this.enemies);
                throw new Error(`Could not find NPC information at x: ${pos.x}, y: ${pos.y}.`);
            }
            var npc = matching[0];
            switch (npc.type) {
                case Assets.Sprites.OldMan.key:
                    return new OldMan(main, npc.position, npc.textKey, this.makeMovementScript(npc.position, npc.script));
                case Assets.Images.Sign:
                    return new Sign(main, npc.position, npc.textKey);
            }
            throw new Error(`${npc.type} is not a valid NPC type.`);
        }

        private makeMovementScript(position: Phaser.Point, script: string): MovementScript {
            if (!script) {
                return null;
            }
            var directions = script.toLocaleLowerCase().split("").map(c => this.getDirectionFromLetter(c));
            return new MovementScript(position, directions);
        }

        private getDirectionFromLetter(letter: string): Direction {
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
                case "f":
                    return Direction.Forward;
                case "b":
                    return Direction.Back;
            }
            throw new Error(`${letter} is not a valid direction char.`);
        }

        private getPadChar(type: IslandType): string {
            switch (type) {
                case IslandType.INSIDE:
                    return "b";
                case IslandType.OUTSIDE:
                    return " ";
                case IslandType.WATER:
                    return "o";
            }
        }
    }
}