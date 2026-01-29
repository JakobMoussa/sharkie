class JellyFish extends MovableObject {
    
    width = 80;
    height = 70;
    vy = 1;
    minY;
    maxY;
    currentImage = 0;
    floatAngle;
    floatSpeed = 0.03;
    heightDepth = 320;


    JELLYFISH_SWIM = [
        'img/Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    constructor(x, y) {
        super();

        this.x = x;
        this.baseY = y;

        this.floatAngle = Math.random() * Math.PI * 1;

        this.loadImage(this.JELLYFISH_SWIM[0]);
        this.loadImages(this.JELLYFISH_SWIM);
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.fishAnimation(this.JELLYFISH_SWIM);
        }, 500);

        setInterval(() => {

            this.floatAngle += this.floatSpeed;

            this.y = this.baseY + Math.sin(this.floatAngle) * this.heightDepth;

            this.y = Math.max(0, Math.min(this.y, 580 - this.height));

        }, 1000 / 60);
    }

    
}