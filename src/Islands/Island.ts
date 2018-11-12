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
        textKey: Texts;
        script: string;
    }

    class MapEnemy {
        position: Phaser.Point;
        type: string;
        script: string;
        afterDeath?: (main: Main) => void;
    }

    class MapOutsideBoundsPortal {
        side: Direction;
        start: number;
        end: number;
        link: number;
        playerStart: Phaser.Point;
    }

    class MapLink {
        pos: Phaser.Point;
        link: number;
        playerStart: Phaser.Point;
    }

    class MapTrigger {
        type: TriggerType;
        x: number;
        y: number;
        width: number;
        height: number;
        name?: string;
        action?: (main: Main, trigger: Trigger) => void;
    }

    class MapCreature {
        type: string;
        x: number;
        y: number;
    }

    export class DialogState {
        x: number;
        y: number;
        lastViewed: number;
    }

    export class IslandBuilder {
        private num: number;
        private type: IslandType;
        private layout: string[];
        private additions: LayoutAddition[];
        private enemies: MapEnemy[];
        private npcs: MapNPC[];
        private outsideBoundsPortals: MapOutsideBoundsPortal[];
        private playerStart: Phaser.Point;
        private links: MapLink[];
        private triggers: MapTrigger[];
        private otherLinks: MapLink[];
        private creatures: MapCreature[];

        constructor(num: number, type: IslandType) {
            this.num = num;
            this.type = type;
            this.layout = [""];
            this.additions = [];
            this.enemies = [];
            this.npcs = [];
            this.outsideBoundsPortals = [];
            this.playerStart = pof(0, 0);
            this.links = [];
            this.triggers = [];
            this.otherLinks = [];
            this.creatures = [];
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

        setLinks(links: MapLink[]): IslandBuilder {
            this.links = links;
            return this;
        }

        setTriggers(triggers: MapTrigger[]): IslandBuilder {
            this.triggers = triggers;
            return this;
        }

        setOtherLinks(otherLinks: MapLink[]): IslandBuilder {
            this.otherLinks = otherLinks;
            return this;
        }

        setCreatures(creatures: MapCreature[]): IslandBuilder {
            this.creatures = creatures;
            return this;
        }

        build(): Island {
            return new Island(this.num, this.type, this.layout, this.additions, this.enemies, this.npcs,
                this.playerStart, this.outsideBoundsPortals, this.links, this.triggers, this.otherLinks,
                this.creatures);
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
        paddingOffset: Phaser.Point;
        links: MapLink[];
        triggers: MapTrigger[];
        dialogStates: DialogState[];
        otherLinks: MapLink[];
        creatures: MapCreature[];

        constructor(num: number, type: IslandType, layout: string[], additions: LayoutAddition[],
            enemies: MapEnemy[], npcs: MapNPC[], playerStart: Phaser.Point, outsideBoundsPortals: MapOutsideBoundsPortal[],
            links: MapLink[], triggers: MapTrigger[], otherLinks: MapLink[], creatures: MapCreature[]) {
            this.num = num;
            this.type = type;
            this.layout = layout;
            this.additions = additions;
            this.enemies = enemies;
            this.npcs = npcs;
            this.playerStart = playerStart;
            this.outsideBoundsPortals = outsideBoundsPortals;
            this.links = links;
            this.triggers = triggers;
            this.creatures = 
            this.dialogStates = [];
            this.creatures = creatures;

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
                npcs.forEach(function (n) { n.position.add(paddingOffset.x, paddingOffset.y); });
                links.forEach(function (l) { l.pos.add(paddingOffset.x, paddingOffset.y); });
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

        makeGround(main: Main, position: Phaser.Point, fromDoor = false): Ground {
            switch (this.type) {
                case IslandType.INSIDE:
                    return new TileFloor(main, position, fromDoor);
                case IslandType.WATER:
                case IslandType.OUTSIDE:
                    return new Grass(main, position);
            }
        }

        makeDoorway(main: Main, pos: Phaser.Point): Doorway {
            if (this.type !== IslandType.INSIDE) {
                throw new Error("Doorways can only exist inside.");
            }
            let matching = this.links.filter(key => key.pos.equals(pos));
            if (matching.length === 0) {
                throw new Error(`Could not find link information at x: ${pos.x}, y: ${pos.y}.`);
            }

            let direction = this.layout[pos.y + 1][pos.x] === "b" ? Direction.Down : Direction.Up;
            return new Doorway(main, pos.clone(), matching[0].link, direction, matching[0].playerStart);
        }

        makeOtherLinks(main: Main): AdhocPortal[] {
            return this.otherLinks.map(l => new AdhocPortal(main, l.pos, l.link, l.playerStart));
        }

        getEnemy(main: Main, pos: Phaser.Point): Enemy {
            var matching = this.enemies.filter(key => key.position.equals(pos));
            if (matching.length === 0) {
                throw new Error(`Could not find enemy information at x: ${pos.x}, y: ${pos.y}.`);
            }
            var enemy = matching[0];
            switch (enemy.type) {
                case Assets.Sprites.JamBotWorld.key:
                    let jambot = new JamBot(main, pcop(enemy.position), Utils.makeMovementScript(enemy.position, enemy.script));
                    jambot.afterDeath = enemy.afterDeath;
                    return jambot;
                case Assets.Sprites.JamBugWorld.key:
                    let jambug = new JamBug(main, pcop(enemy.position), Utils.makeMovementScript(enemy.position, enemy.script));
                    jambug.afterDeath = enemy.afterDeath;
                    return jambug;
            }
            throw new Error(`${enemy.type} is not a valid enemy type.`);
        }

        getNPC(main: Main, pos: Phaser.Point): NPC {
            let matching = this.npcs.filter(n => n.position.equals(pos));
            if (matching.length === 0) {
                throw new Error(`Could not find NPC information at x: ${pos.x}, y: ${pos.y}.`);
            }
            let mapNPC = matching[0];
            let npc = null as NPC;
            switch (mapNPC.type) {
                case Assets.Sprites.Albert.key:
                    npc = new Albert(main, pcop(mapNPC.position), mapNPC.textKey, Utils.makeMovementScript(mapNPC.position, mapNPC.script));
                    break;
                case Assets.Sprites.OldMan.key:
                    npc = new OldMan(main, pcop(mapNPC.position), mapNPC.textKey, Utils.makeMovementScript(mapNPC.position, mapNPC.script));
                    break;
                case Assets.Images.Sign:
                    npc = new Sign(main, pcop(mapNPC.position), mapNPC.textKey);
                    break;
                default:
                    throw new Error(`${mapNPC.type} is not a valid NPC type.`);
            }
            var matchingStates = this.dialogStates.filter(d => d.x === pos.x && d.y === pos.y);
            if (matchingStates.length === 0) {
                this.dialogStates.push({ x: pos.x, y: pos.y, lastViewed: -1 });
            } else {
                npc.setDialogState(matchingStates[0].lastViewed);
            }
            return npc;
        }

        getCreature(main: Main, x: number, y: number): Creature {
            let matching = this.creatures.filter(c => c.x == x && c.y == y);
            if (matching.length === 0) {
                throw new Error(`Could not find Creature information at x: ${x}, y: ${y}.`);
            }
            let mapCreature = matching[0];
            switch (mapCreature.type) {
                case Assets.Sprites.Blish.key:
                    return new Blish(main, pof(x, y));
                default:
                    throw new Error(`${mapCreature.type} is not a valid Creature type.`);
            }
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
                            portals.push(new OutsideBoundsPortal(main, pof(i, -1), portalGroup.link, pcop(portalGroup.playerStart)));
                            break;
                        case Direction.Left:
                            portals.push(new OutsideBoundsPortal(main, pof(-1, i), portalGroup.link, pcop(portalGroup.playerStart)));
                            break;
                        case Direction.Right:
                            portals.push(new OutsideBoundsPortal(main, pof(this.layout[0].length, i), portalGroup.link, pcop(portalGroup.playerStart)));
                            break;
                        case Direction.Down:
                            portals.push(new OutsideBoundsPortal(main, pof(i, this.layout.length), portalGroup.link, pcop(portalGroup.playerStart)));
                    }
                }
            }
            return portals;
        }

        getAdjustedPosition(point: Phaser.Point): Phaser.Point {
            if (!this.paddingOffset) {
                return point.clone();
            }
            return point.add(this.paddingOffset.x, this.paddingOffset.y);
        }

        getDialogStates() {
            return this.dialogStates.slice();
        }

        saveDialogState(x: number, y: number, lastViewed: number) {
            let matching = this.dialogStates.filter(d => d.x === x && d.y === y);
            if (matching.length > 0) {
                matching[0].lastViewed = lastViewed;
            } else {
                this.dialogStates.push({ x: x, y: y, lastViewed: lastViewed });
            }
        }

        public makeTriggers(main: Main): Trigger[] {
            return this.triggers.map(t => {
                switch (t.type) {
                    case TriggerType.REGULAR:
                        return new Trigger(main, t.x, t.y, t.width, t.height, t.action);
                    case TriggerType.MOVE_NPC:
                        return new NPCMoveTrigger(main, t.x, t.y, t.width, t.height, t.name);
                }
            });
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