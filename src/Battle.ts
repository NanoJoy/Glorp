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
            this.playerHealth = 100;
            var stateTransfer = StateTransfer.getInstance();

            this.playerHealthDisplay = new HealthDisplay(this, 10, 100, "You", this.playerHealth);
            if (!SpriteUtils.isAThing(stateTransfer.enemy)) {
                throw new Error("enemy is not set for battle.");
            }
            this.enemy = stateTransfer.enemy;
            this.inputs = new Inputs(this);
            this.enemyHealthDisplay = new HealthDisplay(this, 10, 200, this.enemy.name, this.enemy.hitPoints);
            this.patternDisplayer = new PatternDisplayer(this, this.enemy);
            this.patternChecker = new PatternMatcher(this, this.enemy);
            this.startPattern();
            this.time.events.loop(this.enemy.tempo * this.enemy.patternLength * 2, this.startPattern, this);
        }

        private startChecker() {
            this.patternChecker.begin(this.currentPattern);
        }

        private startPattern() {
            if (SpriteUtils.isAThing(this.patternChecker.notesPressed)) {
                this.afterRound();
            }
            this.patternDisplayer.reset();
            this.patternChecker.reset();
            this.currentPattern = this.patternDisplayer.display();
            this.time.events.add((this.enemy.patternLength - 1) * this.enemy.tempo, this.startChecker, this);
        }

        private afterRound() {
            var damage = this.enemy.calculateDamage(this.currentPattern, this.patternChecker.notesPressed);
            if (damage === 0) {
                var playerDamage = this.playerHealth - this.enemy.getAttackPoints(this.currentPattern);
                this.playerHealth = Math.max(playerDamage, 0);
                this.playerHealthDisplay.updateHitPoints(this.playerHealth);
                if (this.playerHealth === 0) {
                    this.game.time.events.stop(true);
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
            stateTransfer.position = new Phaser.Point(Math.floor(this.enemy.worldSprite.position.x / TILE_WIDTH), Math.floor(this.enemy.worldSprite.position.y / TILE_HEIGHT));
            this.state.start(States.Main);
        }
    }

    class HealthDisplay {
        battle: Battle;
        x: number;
        y: number;
        text: Phaser.Text;
        healthBarContainer: Phaser.Image;
        healthBar: Phaser.Sprite;
        hitPoints: number;

        constructor(battle: Battle, x: number, y: number, name: string, hitPoints: number) {
            this.battle = battle;
            this.x = x;
            this.y = y;
            this.hitPoints = hitPoints;
            this.text = battle.add.text(x, y, name, { font: "16px okeydokey", fill: "#000000" });
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