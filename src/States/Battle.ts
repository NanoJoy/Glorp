module MyGame {
    export class Battle extends Phaser.State {
        public inputs: Inputs;
        private currentPattern: PatternNote[];
        private patternDisplayer: PatternDisplayer;
        private patternChecker: PatternMatcher;
        private playerHealth: number;
        private playerHealthDisplay: HealthDisplay;
        private enemyHealthDisplay: HealthDisplay;
        enemy: Enemy;
        private music: Phaser.Sound;
        private passedMeasures: number;
        private middleText: MiddleText;
        playerDisplay: CharacterDisplay;
        enemyDisplay: CharacterDisplay;

        create() {
            this.sound.stopAll();
            this.inputs = new Inputs(this);
            this.sound.boot();
            if (DEVELOPER_MODE) {
                this.inputs.spacebar.onUp.add(this.enemyDeath, this);
                this.inputs.shift.onUp.add(() => {
                    this.playerHealth = 0;
                    this.afterRound();
                }, this);
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
            this.middleText = new MiddleText(this.game, this.enemy.tempo);
            Utils.fadeInFromBlack(this, 500, this.startCountdown, this);
        }

        startCountdown() {
            this.music.play(null, 0);
            let count = this.enemy.beatLength === 2 ? 3 : this.enemy.beatLength - 1;
            let millis = Utils.bpmToMilliseconds(this.enemy.tempo);
            let introLength = ((count + 1) * millis) / 1000
            this.music.addMarker("hi", introLength, this.music.totalDuration - introLength);
            this.time.events.add(millis * (count - 2), () => {
                this.playerDisplay.slideIn(true, millis);
            });
            this.time.events.add(millis * (count - 1), () => {
                this.enemyDisplay.slideIn(false, millis);
            });
            this.time.events.add(millis * (count + 1), () => {
                this.startBattle();
            }, this);
            this.middleText.startCountdown(count, "WATCH!!!")
            this.time.events.start();
        }

        startBattle() {
            this.startPattern();
            this.time.events.loop(this.patternDisplayer.tempo * this.enemy.patternLength * 2, this.startPattern, this);
            this.time.events.start();
        }

        private startChecker() {
            this.patternChecker.begin(this.currentPattern);
            let millis = Utils.bpmToMilliseconds(this.enemy.tempo);
            this.time.events.add((this.enemy.patternLength - 1) * millis, () => {
                this.middleText.showTextForOneBeat("WATCH!!!");
            }, this);
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
            let millis = Utils.bpmToMilliseconds(this.enemy.tempo);
            this.time.events.add((this.enemy.patternLength - 1) * millis, () => {
                this.middleText.showTextForOneBeat("GO!!!");
            }, this);
        }

        private afterRound() {
            var damage = this.enemy.calculateDamage(this.currentPattern, this.patternChecker.notesPressed);
            if (damage === 0) {
                var playerDamage = this.playerHealth - this.enemy.getAttackPoints(this.currentPattern);
                this.playerHealth = Math.max(playerDamage, 0);
                this.playerHealthDisplay.updateHitPoints(this.playerHealth);
                if (this.playerHealth === 0) {
                    this.sound.stopAll();
                    let stateTransfer = StateTransfer.getInstance();
                    stateTransfer.reason = TransferReason.DEATH;
                    stateTransfer.health = -1;
                    this.game.state.start(States.Result);
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
            this.sound.stopAll();
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
            this.state.start(States.Result);
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

        playAnim(name: string, frames: number[], speed: number) {
            if (!this.image.animations.getAnimation(name)) {
                this.image.animations.add(name, frames, speed);
            }
            this.image.play(name);
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

    class MiddleText {
        private group: Phaser.Group;
        private text: Phaser.BitmapText;
        private millis: number;

        constructor(private game: Phaser.Game, tempo: number) {
            this.millis = Utils.bpmToMilliseconds(tempo);
            this.group = this.game.add.group(this.game.world, "middletext", true);
            this.text = this.game.add.bitmapText(0, 0, Assets.FontName, "", Assets.FontSize);
            this.group.add(this.text);
            let banner = this.game.add.sprite(0, 0, Assets.Images.Banner);
            banner.alpha = 0.3;
            Utils.centerImage(banner);
            this.group.add(banner);
            this.group.bringToTop(this.text);
        }

        startCountdown(count: number, lastWord: string) {
            for (let i = 0; i <= count; i++) {
                this.game.time.events.add(this.millis * (count - i), () => {
                    this.updateContent(i === 0 ? lastWord : i.toString());
                }, this);
            }
            this.game.time.events.add(this.millis * (count + 1), () => {
                this.group.visible = false;
            }, this);
        }

        showTextForOneBeat(content: string) {
            this.updateContent(content);
            this.game.time.events.add(this.millis, () => {
                this.group.visible = false;
            }, this);
        }

        private updateContent(content: string) {
            this.group.visible = true;
            this.text.text = content;
            Utils.centerInScreen(this.text);
        }
    }
}