module MyGame {
    export class Battle extends Phaser.State {
        public inputs: Inputs;
        private currentPattern: PatternNote[];
        private patternDisplayer: PatternDisplayer;
        private patternChecker: PatternMatcher;
        private playerHealth: number;
        private playerHealthDisplay: HealthDisplay;
        private enemyHealthDisplay: HealthDisplay;
        private enemy: Enemy;
        private music: Phaser.Sound;
        private passedMeasures: number;
        playerDisplay: CharacterDisplay;
        enemyDisplay: CharacterDisplay;

        create() {
            this.inputs = new Inputs(this);
            this.sound.boot();
            if (DEVELOPER_MODE) {
                this.inputs.spacebar.onUp.add(this.enemyDeath, this);
            }

            this.time.reset();
            this.time.events.removeAll();
            this.stage.backgroundColor = 0xEAEAEA;

            let stateTransfer = StateTransfer.getInstance();
            this.playerHealth = stateTransfer.health === -1 ? 100 : stateTransfer.health;
            let playerKey = WorldManager.getInstance().getIsland(stateTransfer.island).type === IslandType.INSIDE ? Frames.PlayerBattle.INSIDE : Frames.PlayerBattle.OUTSIDE;
            this.playerDisplay = new CharacterDisplay(this, 10, SCREEN_HEIGHT - 146, Assets.Sprites.PlayerBattle.key, playerKey);
            this.playerHealthDisplay = new HealthDisplay(this, 146, SCREEN_HEIGHT - 50, "You", Player.STARTING_HEALTH);
            this.playerHealthDisplay.updateHitPoints(this.playerHealth);
            if (!Utils.isAThing(stateTransfer.enemy)) {
                throw new Error("enemy is not set for battle.");
            }
            this.enemy = stateTransfer.enemy;
            let topY = Assets.Sprites.RhythmSymbols.height * 2 + 20;
            this.enemyDisplay = new CharacterDisplay(this, SCREEN_WIDTH - 146, topY, this.enemy.battleSpriteKey);
            this.enemyHealthDisplay = new HealthDisplay(this, 10, topY, this.enemy.name, this.enemy.hitPoints);
            this.patternDisplayer = new PatternDisplayer(this, this.enemy);
            this.patternChecker = new PatternMatcher(this, this.enemy);
            this.passedMeasures = -2;
            this.music = this.sound.add(this.enemy.music.key);
            Utils.fadeInFromBlack(this, 500, this.startCountdown, this);
        }

        startCountdown() {
            this.music.play(null, 0);
            let count = this.enemy.beatLength === 2 ? 3 : this.enemy.beatLength - 1;
            let display = this.add.bitmapText(0, 22, Assets.FontName, count.toString(), Assets.FontSize);
            this.updateCount(count, display);
            let millis = Utils.bpmToMilliseconds(this.enemy.tempo);
            let introLength = ((count + 1) * millis) / 1000
            this.music.addMarker("hi", introLength, this.music.totalDuration - introLength);
            for (let i = 0; i <= count; i++) {
                this.time.events.add(millis * (count - i), () => {
                    this.updateCount(i, display);
                    if (i === 3) {
                        this.playerDisplay.slideIn(true, millis);
                    } else if (i === 2) {
                        this.enemyDisplay.slideIn(false, millis);
                    }
                }, this);
            }
            this.time.events.add(millis * (count + 1), () => {
                this.startBattle();
                display.visible = false;
            }, this);
            this.time.events.start();
        }

        updateCount(count: number, display: Phaser.BitmapText) {
            display.text = count === 0 ? "GO!!!" : count.toString();
            Utils.centerInScreen(display);
        }

        startBattle() {
            this.startPattern();
            this.time.events.loop(this.patternDisplayer.tempo * this.enemy.patternLength * 2, this.startPattern, this);
            this.time.events.start();
        }

        private startChecker() {
            this.patternChecker.begin(this.currentPattern);
        }

        private startPattern() {
            this.passedMeasures = (this.passedMeasures + 2) % this.enemy.music.measures;
            if (this.passedMeasures === 0) {
                this.music.play("hi");
            }

            if (Utils.isAThing(this.patternChecker.notesPressed)) {
                this.afterRound();
            }
            this.patternDisplayer.reset();
            this.patternChecker.reset();
            this.currentPattern = this.patternDisplayer.display();
            this.time.events.add((this.enemy.patternLength - 1) * this.patternDisplayer.tempo, this.startChecker, this);
        }

        private afterRound() {
            var damage = this.enemy.calculateDamage(this.currentPattern, this.patternChecker.notesPressed);
            if (damage === 0) {
                var playerDamage = this.playerHealth - this.enemy.getAttackPoints(this.currentPattern);
                this.playerHealth = Math.max(playerDamage, 0);
                this.playerHealthDisplay.updateHitPoints(this.playerHealth);
                if (this.playerHealth === 0) {
                    StateTransfer.getInstance().reason = TransferReason.DEATH;
                    StateTransfer.getInstance().health = -1;
                    this.game.state.start(States.Main);
                }
                return;
            }

            this.enemy.health = Math.max(this.enemy.health - damage, 0);
            this.enemyHealthDisplay.updateHitPoints(this.enemy.health);
            if (this.enemy.health === 0) {
                this.enemyDeath();
            }
        }

        private enemyDeath() {
            this.game.time.events.stop(true);
            var stateTransfer = StateTransfer.getInstance();
            stateTransfer.enemy = null;
            this.enemy.die();
            if (Utils.isAThing(this.enemy.transferPosition)) {
                stateTransfer.position = this.enemy.transferPosition;
            } else {
                stateTransfer.position = new Phaser.Point(Math.floor(this.enemy.worldSprite.position.x / TILE_WIDTH), Math.floor(this.enemy.worldSprite.position.y / TILE_HEIGHT));
            }
            stateTransfer.funcs = this.enemy.afterDeath;
            stateTransfer.reason = TransferReason.VICTORY;
            stateTransfer.health = this.playerHealth;
            this.state.start(States.Main);
        }
    }

    let MOVEMENT_AMOUNT = 6;
    class CharacterDisplay {
        private battle: Battle;
        private image: Phaser.Image;
        private startX: number;
        private startY: number;

        constructor(battle: Battle, x: number, y: number, key: string, frame = 0) {
            this.battle = battle;
            this.image = battle.add.image(x, y, key, frame);
            this.image.anchor.setTo(0.5, 0.5);
            this.image.position.setTo(x + this.image.width / 2, y + this.image.height / 2);
            this.startX = this.image.position.x;
            this.startY = this.image.position.y;
            this.image.visible = false;
        }

        slideIn(fromLeft: boolean, millis: number) {
            this.image.visible = true;
            let startPos = fromLeft ? this.image.width * -1 : SCREEN_WIDTH + this.image.width;
            this.battle.add.tween(this.image.position).from({ x: startPos }, millis / 2, Phaser.Easing.Linear.None, true, millis / 2);
        }

        reset() {
            this.image.position.setTo(this.startX, this.startY);
            this.image.scale.setTo(1, 1);
        }

        moveUp() {
            this.image.position.y -= MOVEMENT_AMOUNT;
        }

        moveDown() {
            this.image.position.y += MOVEMENT_AMOUNT;
        }

        moveLeft() {
            this.image.position.x -= MOVEMENT_AMOUNT;
        }

        moveRight() {
            this.image.position.x += MOVEMENT_AMOUNT;
        }

        pressO() {
            this.image.scale.setTo(1.1, 1.1)
        }

        pressK() {
            this.image.scale.setTo(0.9, 0.9);
        }
    }

    class HealthDisplay {
        battle: Battle;
        x: number;
        y: number;
        text: Phaser.BitmapText;
        healthBarContainer: Phaser.Image;
        healthBar: Phaser.Sprite;
        hitPoints: number;

        constructor(battle: Battle, x: number, y: number, name: string, hitPoints: number) {
            this.battle = battle;
            this.x = x;
            this.y = y;
            this.hitPoints = hitPoints;
            this.text = battle.add.bitmapText(x, y, Assets.FontName, name, Assets.FontSize);
            this.healthBarContainer = battle.add.image(x, y + 18, Assets.Images.HealthBarContainer);
            this.healthBar = null;
            this.updateHitPoints(hitPoints);
        }

        updateHitPoints(hp: number) {
            if (hp > this.hitPoints || hp < 0) {
                throw new Error(`Hit points not in valid range: ${hp}.`);
            }
            if (this.healthBar !== null) {
                this.healthBar.destroy();
                this.healthBar = null;
            }
            var width = Math.round((hp / this.hitPoints) * ((this.healthBarContainer.width - 4) / 2)) * 2;
            var bmd = this.battle.add.bitmapData(width, this.healthBarContainer.height - 4);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, width, this.healthBarContainer.height - 4);
            bmd.ctx.fillStyle = "#606060";
            bmd.ctx.fill();
            this.healthBar = this.battle.add.sprite(this.healthBarContainer.x + 2, this.healthBarContainer.y + 2, bmd);
        }
    }
}