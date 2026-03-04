class PoisonShot extends MovableObject {
    width = 40;
    height = 50;
    speed = 10;
    currentImage = 0;
    hit = false;

    IMAGES_SHOT = [
        'img/Grafiken/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png',
    ];

    constructor(x, y, goLeft = false) {
        super();
        this.x = x;
        this.y = y;
        this.otherDirection = goLeft;
        this.speed = goLeft ? -Math.abs(this.speed) : Math.abs(this.speed);

        this.loadImage(this.IMAGES_SHOT[0]);
        this.loadImages(this.IMAGES_SHOT);
        this.animate();
    }

    /**
     * Moves the projectile each frame and advances its animation.
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            this.x += this.speed;
            this.fishAnimation(this.IMAGES_SHOT);
        }, 1000 / 60);
    }
}
