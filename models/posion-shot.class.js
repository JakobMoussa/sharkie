class PoisonShot extends MovableObject {
    width = 40;
    height = 50;
    speed = 10;
    currentImage = 0;

    IMAGES_SHOT = [
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/Poisoned Bubble (for whale).png',
    ];

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;

        this.loadImage(this.IMAGES_SHOT[0]);
        this.loadImages(this.IMAGES_SHOT);
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x += this.speed;
            this.fishAnimation(this.IMAGES_SHOT);
        }, 1000 / 60);
    }
}