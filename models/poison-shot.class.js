class PoisonShot extends MovableObject {
    width = 40;
    height = 50;
    speed = 10;
    currentImage = 0;
    hit = false;
    static preloadedImg = null;

    IMAGES_SHOT = [
        'img/Grafiken/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png',
    ];

    constructor(x, y, goLeft = false) {
        super();
        PoisonShot.preload();
        this.x = x;
        this.y = y;
        this.otherDirection = goLeft;
        this.speed = goLeft ? -Math.abs(this.speed) : Math.abs(this.speed);

        this.loadImage(this.IMAGES_SHOT[0]);
        this.loadImages(this.IMAGES_SHOT);
        if (PoisonShot.preloadedImg) {
            this.imageCache[this.IMAGES_SHOT[0]] = PoisonShot.preloadedImg;
            this.img = PoisonShot.preloadedImg;
        }
        this.animate();
    }

    /**
     * Preloads the poison bubble sprite once to prevent the first shot from showing the last frame.
     * @returns {void}
     */
    static preload() {
        if (PoisonShot.preloadedImg) return;
        const img = new Image();
        img.src = 'img/Grafiken/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png';
        if (img.decode) {
            img.decode().catch(() => {});
        }
        PoisonShot.preloadedImg = img;
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
