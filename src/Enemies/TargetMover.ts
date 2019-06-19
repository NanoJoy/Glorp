module MyGame {
    export class TargetMover implements IMovementManager {
        private subject: Moveable;
        private blockers: Barrier[];
        private target: Phaser.Sprite;
        private paused: boolean;

        constructor(subject: Moveable, blockers: Barrier[]) {
            this.subject = subject;
            this.blockers = blockers;
            this.paused = false;
        }

        setBlockers(blockers: Barrier[]) {
            this.blockers = blockers;
        }

        followTarget(target: Phaser.Sprite) {
            if (this.target) {
                this.unfollowTarget();
            }
            this.target = target;
        }

        update() {
            if (this.paused || !this.target) return;
            let roundedTargetPos = Utils.roundToClosestTile(this.target.position);
            let roundedSubjectPos = Utils.roundToClosestTile(this.subject.sprite.position);
            let blockerPos = this.blockers.map(b => Utils.roundToClosestTile(b.position));

            if (roundedSubjectPos.x !== roundedTargetPos.x) {
                if (!blockerPos.some(p => p.y === roundedSubjectPos.y)) {
                    this.getBody().velocity.setTo(this.subject.speed, 0);
                    return;
                }
            }
            if (roundedSubjectPos.y !== roundedTargetPos.y) {
                if (!blockerPos.some(p => p.x === roundedSubjectPos.x)) {
                    this.getBody().velocity.setTo(0, this.subject.speed);
                    return;
                }
            }
            this.getBody().velocity.setTo(0, 0);
        }

        pause() {
            this.paused = true;
            this.getBody().velocity.setTo(0, 0);
        }

        resume() {
            this.paused = false;
        }

        unfollowTarget() {
            this.target = null;
            this.getBody().velocity.setTo(0, 0);
        }

        private getBody(): Phaser.Physics.Arcade.Body {
            return this.subject.sprite.body as Phaser.Physics.Arcade.Body;
        }
    }
}