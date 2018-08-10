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

    class MapOutsideBoundsPortal {
        side: Direction;
        start: number;
        end: number;
        link: number;
        playerStart: Phaser.Point;
    }

    export class IslandBuilder {
        private num: number;
        private type: IslandType;
        private position: Phaser.Point;
        private layout: string[];
        private additions: LayoutAddition[];
        private enemies: MapEnemy[];
        private npcs: MapNPC[];
        private outsideBoundsPortals: MapOutsideBoundsPortal[];
        private playerStart: Phaser.Point;

        constructor(num: number, type: IslandType) {
            this.num = num;
            this.type = type;
            this.layout = [""];
            this.additions = [];
            this.enemies = [];
            this.npcs = [];
            this.outsideBoundsPortals = [];
            this.playerStart = pof(0, 0);
        }

        setLayout(layout: string[]): IslandBuilder {
            this.layout = layout;
            return this;
        }

        setAdditions(additions: LayoutAddition[]): IslandBuilder {
            this.additions = additions;
            return this;
        }

        setEnemies(enemies: MapEnemy[]): IslandBuilder {
            this.enemies = enemies;
            return this;
        }

        setNPCs(npcs: MapNPC[]): IslandBuilder {
            this.npcs = npcs;
            return this;
        }

        setOutsideBoundsPortals(portals: MapOutsideBoundsPortal[]): IslandBuilder {
            this.outsideBoundsPortals = portals;
            return this;
        }

        setPlayerStart(playerStart: Phaser.Point): IslandBuilder {
            this.playerStart = playerStart;
            return this;
        }

        build(): Island {
            return new Island(this.num, this.type, this.layout, this.additions, this.enemies, this.npcs,
                this.playerStart, this.outsideBoundsPortals);
        }
    }

    export class Island {
        num: number;
        type: IslandType;
        position: Phaser.Point;
        layout: string[];
        additions: LayoutAddition[];
        enemies: MapEnemy[];
        npcs: MapNPC[];
        outsideBoundsPortals: MapOutsideBoundsPortal[];
        playerStart: Phaser.Point;
        private paddingOffset: Phaser.Point;

        constructor(num: number, type: IslandType, layout: string[], additions: LayoutAddition[],
            enemies: MapEnemy[], npcs: MapNPC[], playerStart: Phaser.Point, outsideBoundsPortals: MapOutsideBoundsPortal[]) {
            this.num = num;
            this.type = type;
            this.layout = layout;
            this.additions = additions;
            this.enemies = enemies;
            this.npcs = npcs;
            this.playerStart = playerStart;
            this.outsideBoundsPortals = outsideBoundsPortals;

            if (this.type !== IslandType.OUTSIDE) {
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
                console.log("here");
                npcs.forEach(function (n) { n.position.add(paddingOffset.x, paddingOffset.y); });
                outsideBoundsPortals.forEach(function (o) {
                    if (o.side === Direction.Up || o.side === Direction.Down) {
                        o.start += paddingOffset.x;
                        o.end += paddingOffset.x;
                    } else {
                        o.start += paddingOffset.y;
                        o.end += paddingOffset.y;
                    }
                });
                this.paddingOffset = paddingOffset;
            }
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
                    return new JamBot(main, pcop(enemy.position), this.makeMovementScript(enemy.position, enemy.script));
            }
            throw new Error(`${enemy.type} is not a valid enemy type.`);
        }

        getNPC(main: Main, pos: Phaser.Point): NPC {
            var matching = this.npcs.filter(n => n.position.equals(pos));
            if (matching.length === 0) {
                console.log(this.npcs);
                throw new Error(`Could not find NPC information at x: ${pos.x}, y: ${pos.y}.`);
            }
            var npc = matching[0];
            switch (npc.type) {
                case Assets.Sprites.OldMan.key:
                    return new OldMan(main, pcop(npc.position), npc.textKey, this.makeMovementScript(npc.position, npc.script));
                case Assets.Images.Sign:
                    return new Sign(main, pcop(npc.position), npc.textKey);
            }
            throw new Error(`${npc.type} is not a valid NPC type.`);
        }

        getPortals(main: Main): OutsideBoundsPortal[] {
            let portals = [] as OutsideBoundsPortal[];

            for (let portalGroup of this.outsideBoundsPortals) {
                if (portalGroup.end < portalGroup.start) {
                    throw new Error(`Portal group end ${portalGroup.end} is less than start ${portalGroup.start}.`)
                }

                for (let i = portalGroup.start; i < portalGroup.end; i++) {
                    switch (portalGroup.side) {
                        case Direction.Up:
                            portals.push(new OutsideBoundsPortal(main, pof(i, -2), portalGroup.link, pcop(portalGroup.playerStart)));
                            break;
                        case Direction.Left:
                            portals.push(new OutsideBoundsPortal(main, pof(-2, i), portalGroup.link, pcop(portalGroup.playerStart)));
                            break;
                        case Direction.Right:
                            portals.push(new OutsideBoundsPortal(main, pof(this.layout[0].length + 2, i), portalGroup.link, pcop(portalGroup.playerStart)));
                            break;
                        case Direction.Down:
                            portals.push(new OutsideBoundsPortal(main, pof(i, this.layout.length + 2), portalGroup.link, pcop(portalGroup.playerStart)));
                    }
                }
            }
            return portals;
        }

        getAdjustedPosition(point: Phaser.Point): Phaser.Point {
            return point.add(this.paddingOffset.x, this.paddingOffset.y);
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