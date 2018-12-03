module MyGame {
    var keyMap = (type: ProjectileType): string => {
        switch (type) {
            case ProjectileType.CRUMBS:
                return Assets.Sprites.Crumbs.key;
        }
        throw new Error("Projectile Type must not be NONE");
    }

    export abstract class Source extends Barrier {

        renewing: boolean;
        amount: number;
        type: ProjectileType;

        constructor(type: ProjectileType, main: Main, x: number, y: number, renewing: boolean, amount: number) {
            super(main, pof(x, y), keyMap(type), "s", true);
            this.type = type;
            this.renewing = renewing;
            this.amount = amount;

            this.onCollision = (playerSprite: Phaser.Sprite, barrierSprite: Phaser.Sprite) => {
                this.main.player.projectileType = this.type;
                this.main.player.projectileCount = this.amount;
                this.main.projectileDisplay.updateCount(this.amount);
            }
        }
    }

    export class CrumbSource extends Source {
        constructor(main: Main, x: number, y: number) {
            super(ProjectileType.CRUMBS, main, x, y, true, 10);
        }
    }
}