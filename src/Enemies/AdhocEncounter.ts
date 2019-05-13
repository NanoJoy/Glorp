module MyGame {
    export abstract class Enemy {
        name: string;
        minNumNotes: number;
        maxNumNotes: number;
        patternLength: number;
        beatLength: number;
        tempo: number;
        battleSpriteKey: string;
        worldSpriteKey: string;
        worldSprite: Phaser.Sprite;
        hitPoints: number;
        health: number;
        alive: boolean;
        movementManager: MovementManager;
        transferPosition: Phaser.Point;
        music: AudioAsset;
        abstract onStageBuilt(): void;
        abstract update(): void;
        abstract afterDeath(main: Main): void;

        
        abstract calculateDamage(pattern: PatternNote[], notePresses: NotePress[]): number;
        abstract getAttackPoints(pattern: PatternNote[]): number;
        abstract die(): void;
        abstract noteComparer(pattern: Phaser.KeyCode[], pressed: number, pressedCount: number): boolean;

        startBattle(main: Main) {
            let stateTransfer = StateTransfer.getInstance();
            stateTransfer.island = main.island.num;
            stateTransfer.enemy = this;
            stateTransfer.dialogs = WorldManager.getInstance().exportDialogs();
            stateTransfer.triggers = main.triggers.filter(t => !t.active)
                .map(t => new Location(main.island.num, t.x, t.y));
            main.groups.npcs.filter(n => n.hasSaveInfo()).forEach(n => {
                let info = n.unloadSaveInfo();
                let matches = stateTransfer.npcs.filter(t => t.old.equals(info.old));
                if (matches.length > 0) {
                    let match = matches[0];
                    match.now = info.now;
                    match.script = info.script;
                    match.speed = info.speed;
                } else {
                    stateTransfer.npcs.push(info);
                }
            });
            stateTransfer.health = main.player.health;
            stateTransfer.flags["USE_SAVE"] = true;
            main.stopPlayer();
            Utils.fadeToBlack(main, 500, States.Battle);
        }
    }

    abstract class AdhocEncounter extends Enemy {
        abstract name: string;
        abstract minNumNotes: number;
        abstract maxNumNotes: number;
        abstract patternLength: number;
        abstract beatLength: number;
        abstract tempo: number;
        abstract hitPoints: number;
        abstract health: number;
        abstract battleSpriteKey: string;
        worldSpriteKey = null as string;
        worldSprite = null as Phaser.Sprite;
        alive: boolean;
        movementManager = null as MovementManager;
        transferPosition: Phaser.Point;
        onStageBuilt: () => void;
        update: () => void;
        afterDeath: (main: Main) => void;

        constructor() {
            super();
        }
    }

    export class OvenEncounter extends AdhocEncounter {
        main: Main;
        name = "Oven";
        music = Assets.Audio.Oven;
        battleSpriteKey = Assets.Images.OvenBattle;
        minNumNotes = 4;
        maxNumNotes = 6;
        patternLength = 6;
        beatLength = 3;
        tempo = 140;
        hitPoints = 300;
        health = 300;

        constructor(main: Main) {
            super();
            this.main = main;
            this.transferPosition = pof(17, 5);
        }

        calculateDamage(pattern: PatternNote[], notePresses: NotePress[]): number {
            if (pattern.length !== notePresses.length) {
                return 0;
            }
            let sortedPattern = pattern.sort(function (a, b) { return a.position - b.position });
            let sortedPresses = notePresses.sort(function (a, b) { return b.position - a.position });
            let damage = 0;
            for (let i = 0; i < sortedPattern.length; i++) {
                if (sortedPattern[i].key !== sortedPresses[i].note) {
                    return 0;
                }
                damage += Math.round((500 - sortedPresses[i].distance) / 33);
            }
            return damage;
        }

        getAttackPoints(pattern: PatternNote[]) {
            return Math.floor((pattern.length * 25) / 2);
        }

        noteComparer(pattern: Phaser.KeyCode[], pressed: number, pressedCount: number): boolean {
            var noNulls = pattern.filter(p => Utils.isAThing(p));
            if (pressedCount > noNulls.length) {
                return false;
            }
            return noNulls[noNulls.length - 1 - pressedCount] === pressed;
        }

        die() {
            this.alive = false;
        }
    }

    export class BlumpusEncounter extends AdhocEncounter {
        main: Main;
        name = "Oven";
        music = Assets.Audio.Blumpus;
        battleSpriteKey = Assets.Images.OvenBattle;
        minNumNotes = 5;
        maxNumNotes = 7;
        patternLength = 8;
        beatLength = 4;
        tempo = 150;
        hitPoints = 300;
        health = 300;

        constructor(main: Main) {
            super();
            this.main = main;
            this.transferPosition = pof(2, 6);
            this.afterDeath = function(main: Main) {
                let blumpus = main.groups.creatures.filter(c => c instanceof Blumpus)[0] as Blumpus;
                blumpus.moveRight();
            }
        }

        calculateDamage(pattern: PatternNote[], notePresses: NotePress[]): number {
            function getRightKey(key: Phaser.KeyCode): Phaser.KeyCode {
                switch (key) {
                    case Phaser.KeyCode.W:
                        return Phaser.KeyCode.S;
                    case Phaser.KeyCode.S:
                        return Phaser.KeyCode.W;
                    case Phaser.KeyCode.A:
                        return Phaser.KeyCode.D;
                    case Phaser.KeyCode.D:
                        return Phaser.KeyCode.A;
                }
                return key;
            }
            if (pattern.length !== notePresses.length) {
                return 0;
            }
            let sortedPattern = pattern.sort(function (a, b) { return a.position - b.position });
            let sortedPresses = notePresses.sort(function (a, b) { return a.position - b.position });
            let damage = 0;
            for (let i = 0; i < sortedPattern.length; i++) {
                if (getRightKey(sortedPattern[i].key) !== sortedPresses[i].note) {
                    return 0;
                }
                damage += Math.round((500 - sortedPresses[i].distance) / 33);
            }
            return damage;
        }

        getAttackPoints(pattern: PatternNote[]) {
            return Math.floor((pattern.length * 25) / 2);
        }

        noteComparer(pattern: Phaser.KeyCode[], pressed: number, pressedCount: number): boolean {
            function getRightKey(key: Phaser.KeyCode): Phaser.KeyCode {
                switch (key) {
                    case Phaser.KeyCode.W:
                        return Phaser.KeyCode.S;
                    case Phaser.KeyCode.S:
                        return Phaser.KeyCode.W;
                    case Phaser.KeyCode.A:
                        return Phaser.KeyCode.D;
                    case Phaser.KeyCode.D:
                        return Phaser.KeyCode.A;
                }
                return key;
            }
            var noNulls = pattern.filter(p => Utils.isAThing(p));
            if (pressedCount > noNulls.length) {
                return false;
            }
            return getRightKey(noNulls[pressedCount]) === pressed;
        }

        die() {
            this.alive = false;
        }
    }

    export class MonsterEncounter extends AdhocEncounter {
        main: Main;
        name = "Monster";
        music = Assets.Audio.Monster;
        battleSpriteKey = Assets.Sprites.Monster.key;
        minNumNotes = 4;
        maxNumNotes = 4;
        patternLength = 4;
        beatLength = 4;
        tempo = 200;
        hitPoints = 300;
        health = 300;

        constructor(main: Main) {
            super();
            this.main = main;
        }

        calculateDamage(pattern: PatternNote[], notePresses: NotePress[]): number {
            if (pattern.length !== notePresses.length) {
                return 0;
            }
            let sortedPattern = pattern.sort(function (a, b) { return a.position - b.position });
            let sortedPresses = notePresses.sort(function (a, b) { return a.position - b.position });
            let damage = 0;
            for (let i = 0; i < sortedPattern.length; i++) {
                if (sortedPattern[i].key !== sortedPresses[i].note || sortedPattern[i].position !== sortedPresses[i].position) {
                    return 0;
                }
                damage += Math.round((500 - sortedPresses[i].distance) / 200);
            }
            return damage;
        }

        getAttackPoints(pattern: PatternNote[]) {
            return Math.floor((pattern.length * 25) / 4);
        }

        die() {
            this.alive = false;
        }

        noteComparer(pattern: Phaser.KeyCode[], pressed: number, pressedCount: number): boolean {
            var noNulls = pattern.filter(p => Utils.isAThing(p));
            if (pressedCount > noNulls.length) {
                return false;
            }
            return noNulls[pressedCount] === pressed;
        }
    }
}