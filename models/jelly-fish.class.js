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
    dead = false;
    deadDone = false;
     

    JELLYFISH_SWIM = [
        'img/Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 1.png',
        'img/Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 2.png',
        'img/Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 3.png',
        'img/Grafiken - Sharkie/2.Enemy/2 Jelly fish/Regular damage/Lila 4.png'
    ];

    JELLYFISH_DEAD = [
        'img/Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Lila/L1.png',
        'img/Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Lila/L2.png',
        'img/Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Lila/L3.png',
        'img/Grafiken - Sharkie/2.Enemy/2 Jelly fish/Dead/Lila/L4.png'
    ];


    constructor(x, y) {
        super();

        this.x = x;
        this.baseY = y;

        this.floatAngle = Math.random() * Math.PI * 1;

        this.loadImage(this.JELLYFISH_SWIM[0]);
        this.loadImages(this.JELLYFISH_SWIM);
        this.loadImages(this.JELLYFISH_DEAD);
        this.animate();
    }

    die() {
        this.dead = true;
        this.deadDone = false;
        this.currentImage = 0;
    }

    animate() {
        setInterval(() => {
            if (this.dead) {
                if (this.currentImage >= this.JELLYFISH_DEAD.length) {
                    this.deadDone = true;
                    this.currentImage = this.JELLYFISH_DEAD.length - 1;
                    this.img = this.imageCache[this.JELLYFISH_DEAD[this.currentImage]];
                    return;
                }

                const path = this.JELLYFISH_DEAD[this.currentImage];
                this.img = this.imageCache[path];
                this.currentImage++;
                return;
            }

            this.fishAnimation(this.JELLYFISH_SWIM);
        }, 200);

        setInterval(() => {
            if (this.dead) return;

            this.floatAngle += this.floatSpeed;
            this.y = this.baseY + Math.sin(this.floatAngle) * this.heightDepth;
            this.y = Math.max(0, Math.min(this.y, 580 - this.height));
        }, 1000 / 60);

    }

    
}