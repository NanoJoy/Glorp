module MyGame {
    export class Battle extends Phaser.State {
        public inputs: Inputs;
        currentPattern: PatternNote[];
        patternDisplayer: PatternDisplayer;
        patternChecker: PatternMatcher;
        playerHealth: number;
        playerHealthDisplay: HealthDisplay;
        enemyHealthDisplay: HealthDisplay;
        enemy: Enemy;

        create() {
            this.inputs = new Inputs(this);
            if (DEVELOPER_MODE) {
                this.inputs.spacebar.onUp.add(this.enemyDeath, this);
            }

            this.time.reset();
            this.stage.backgroundColor =  0xEAEAEA;

            let stateTransfer = StateTransfer.getInstance();
            this.playerHealth = stateTransfer.health === -1 ? 100 : stateTransfer.health;
            this.game.add.image(10, SCREEN_HEIGHT - 146, Assets.Images.PlayerBattle);
            this.playerHealthDisplay = new HealthDisplay(this, 146, SCREEN_HEIGHT - 50, "You", Player.STARTING_HEALTH);
            this.playerHealthDisplay.updateHitPoints(this.playerHealth);
            if (!Utils.isAThing(stateTransfer.enemy)) {
                throw new Error("enemy is not set for battle.");
            }
            this.enemy = stateTransfer.enemy;
            let topY = Assets.Sprites.RhythmSymbols.height * 2 + 20;
            this.game.add.image(SCREEN_WIDTH - 146, topY, this.enemy.battleSpriteKey);
            this.enemyHealthDisplay = new HealthDisplay(this, 10, topY, this.enemy.name, this.enemy.hitPoints);
            this.patternDisplayer = new PatternDisplayer(this, this.enemy);
            this.patternChecker = new PatternMatcher(this, this.enemy);
            this.startPattern();
            this.time.events.loop(this.patternDisplayer.tempo * this.enemy.patternLength * 2, this.startPattern, this);
            this.time.events.start();
        }

        private startChecker() {
            this.patternChecker.begin(this.currentPattern);
        }

        private startPattern() {
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