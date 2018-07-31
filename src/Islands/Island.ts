module MyGame {

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
        position: Phaser.Point;
        layout: string[];
        additions: LayoutAddition[];
        textKeys: TextKey[];
        enemies: MapEnemy[];
        npcs: MapNPC[];
        playerStart: Phaser.Point;

        constructor(num: number, position: Phaser.Point, layout: string[], additions: LayoutAddition[], textKeys: TextKey[], enemies: MapEnemy[], npcs: MapNPC[], playerStart: Phaser.Point) {
            this.num = num;
            this.position = position;
            this.layout = layout;
            this.textKeys = textKeys;
            this.additions = additions;
            this.enemies = enemies;
            this.npcs = npcs;
            this.playerStart = playerStart;
        }

        getTextKey(pos: Phaser.Point): string {
            var matching = this.textKeys.filter(key => key.position.equals(pos));
            if (matching.length === 0) {
                throw new Error(`Could not find text key at x: ${pos.x}, y: ${pos.y}.`)
            }
            return matching[0].key;
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
    }
}