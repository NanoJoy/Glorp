module MyGame {
    export class TargetMover implements IMovementManager {
        private subject: Moveable;
        private blockerPos: Phaser.Point[];
        private target: Phaser.Sprite;
        private paused: boolean;

        constructor(subject: Moveable, blockers: Barrier[]) {
            this.subject = subject;
            this.blockerPos = blockers.map(b => b.position);
            this.paused = false;
        }

        setBlockers(blockers: Barrier[]) {
            this.blockerPos = blockers.map(b => b.position);
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

            if (!this.blockerPos.some(p => p.y === roundedSubjectPos.y && this.betweenThings(p.x, roundedSubjectPos.x, roundedTargetPos.x))
                && !this.blockerPos.some(p => p.x === roundedSubjectPos.x && this.betweenThings(p.y, roundedSubjectPos.y, roundedTargetPos.y))) {

                if (roundedSubjectPos.x !== roundedTargetPos.x) {
                    let toTheRight = roundedTargetPos.x > roundedSubjectPos.x;
                    let multiplier = toTheRight ? 1 : -1;
                    this.subject.direction = toTheRight ? Direction.Right : Direction.Left;
                    this.getBody().velocity.setTo(this.subject.speed * multiplier, 0);
                    return;
                }
                if (roundedSubjectPos.y !== roundedTargetPos.y) {
                    let goingBack = roundedTargetPos.y > roundedSubjectPos.y;
                    let multiplier = goingBack ? 1 : -1;
                    this.subject.direction = goingBack ? Direction.Down : Direction.Up;
                    this.getBody().velocity.setTo(0, this.subject.speed * multiplier);
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

        private betweenThings(p: number, end1: number, end2: number): boolean {
            if (end1 <= end2) {
                return p >= end1 && p <= end2;
            }
            return p <= end1 && p >= end2;
        }
    }
}