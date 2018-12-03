module MyGame {
    var keyMap = (type: ProjectileType): string => {
        switch (type) {
            case ProjectileType.CRUMBS:
                return Assets.Sprites.Crumbs.key;
        }
        throw new Error("Projectile Type must not be NONE");
    }

    abstract class Source implements Entity {
        sprite: Phaser.Sprite;
        position: Phaser.Point;
        main: Main;

        renewing: boolean;
        amount: number;
        type: ProjectileType;

        constructor(type: ProjectileType, main: Main, x: number, y: number, renewing: boolean, amount: number) {
            this.type = type;
            this.main = main;
            this.position = pof(x, y);
            this.renewing = renewing;
            this.amount = amount;

            this.sprite = main.add.sprite(x * TILE_WIDTH, y * TILE_HEIGHT, keyMap(type));
        }

        update() {
            this.main.physics.arcade.collide(this.sprite, this.main.player, )
        }

        give() {
            this.main.player.projectileType = this.type;
            this.main.player.projectileCount = this.amount;
        }
    }
}