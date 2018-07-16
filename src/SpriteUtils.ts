module MyGame {
    export class SpriteUtils {
        static snapToPixels(sprite: Phaser.Sprite) {
            if (sprite.body.velocity.x < 0) {
                sprite.body.position.x = Math.floor(sprite.body.position.x / 2) * 2;
            } else {
                sprite.body.position.x = Math.ceil(sprite.body.position.x / 2) * 2;
            }
            if (sprite.body.velocity.y < 0) {
                sprite.body.position.y = Math.floor(sprite.body.position.y / 2) * 2;
            } else {
                sprite.body.position.y = Math.ceil(sprite.body.position.y / 2) * 2;
            }
        }

        static animationArray(start: number, finish: number): number[] {
            if (finish < start) {
                throw new Error("finish must be greater than or equal to start.");
            }
            var result = [];
            for (var i = start; i <= finish; i++) {
                result.push(i);
            }
            return result;
        }

        static isAThing(thing: object): boolean {
            return thing !== undefined && thing !== null;
        }

        static addPersonAnimations(sprite: Phaser.Sprite) {
            sprite.animations.add("walk_back", SpriteUtils.animationArray(1, 4), 5, true);
            sprite.animations.add("walk_forward", SpriteUtils.animationArray(6, 9), 5, true);
            sprite.animations.add("walk_right", SpriteUtils.animationArray(10, 13), 5, true);
            sprite.animations.add("walk_left", SpriteUtils.animationArray(14, 17), 5, true);
            sprite.animations.add("idle_back", [0], 5, true);
            sprite.animations.add("idle_forward", [5], 5, true);
            sprite.animations.add("idle_right", [10], 5, true);
            sprite.animations.add("idle_left", [14], 5, true);
        }

        static getIdleAnimName(direction: Direction): string {
            return `idle_${SpriteUtils.getDirectionName(direction)}`;
        }

        static getWalkingAnimName(direction: Direction): string {
            return `walk_${SpriteUtils.getDirectionName(direction)}`;
        }

        static getDirectionName(direction: Direction): string {
            switch (direction) {
                case Direction.Down:
                case Direction.Back:
                    return "back";
                case Direction.Up:
                case Direction.Forward:
                    return "forward";
                case Direction.Right:
                    return "right";
                case Direction.Left:
                    return "left";
                default:
                    throw new Error(`Direction ${direction} not supported.`);
            }
        }
    }
}