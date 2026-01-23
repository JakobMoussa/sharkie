class Endboss extends MovableObject {
    
    IMAGES_SWIMING = [
        "img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/1.png",
        "img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/2.png",
        "img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/3.png",
        "img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/4.png",
        "img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/5.png",
        "img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/6.png",
        "img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/7.png",
        "img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/8.png",
        "img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/9.png",
        "img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/1.Introduce/10.png"
    ];

    currentImage = 0;
    vx = 0;
    vy = 0;
    acceleration = 5;
    friction = 0.95;
    baseY = 200;
    floatAngle = 8;
    hasAppeared = false;
    introPlayed = false;
    APPEAR_X = 1500;
    INTRO_DISTANCE = 350;

    constructor() {
        super();
        this.loadImages(this.IMAGES_SWIMING);
        this.x = 1500;
        this.y = 200;
        this.baseY = this.y;
    }

    playIntroAnimation() {
        if (this._introRunning) return;
        this._introRunning = true;

        let i = 0;
        const next = () => {
            if (i < this.IMAGES_SWIMING.length) {
            const path = this.IMAGES_SWIMING[i];
            this.img = this.imageCache[path] || this.img;
            i++;
            setTimeout(next, 180);
            } else {
            this._introRunning = false;
            }
        };

        next();
    }

    endbossAnimation() {
        setInterval(() => {
        if (!this.world) return;

        const shark = this.world.shark;

        if (!this.hasAppeared) {
        if (shark.x >= this.APPEAR_X) {
            this.hasAppeared = true;
 
            this.x = 1700;
            this.y = 0;
            this.baseY = this.y;
        } else {
            return;
        }
        }

        const distance = Math.abs(shark.x - this.x);
        if (!this.introPlayed && distance <= this.INTRO_DISTANCE) {
        this.introPlayed = true;
        this.playIntroAnimation();
        }

        if (!this.introPlayed) return;

        this.floatAngle += 0.05;
        this.y = this.baseY + Math.sin(this.floatAngle) * 30;

        }, 1000 / 60);
    }

}