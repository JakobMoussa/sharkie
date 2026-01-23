class Shark extends MovableObject {
    IMAGES_SWIMING = [   
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/1.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/2.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/3.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/4.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/5.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/6.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/7.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/8.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/9.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/10.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/11.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/12.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/13.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/14.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/15.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/16.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/17.png',
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/18.png',
    ];

    currentImage = 0;
    world;
    speed = 10;
    Keyboard;
    vx = 0;
    vy = 0;

    acceleration = 0.6;
    maxSpeed = 6;
    friction = 0.85;

    constructor() {
        super();
        this.loadImage("img/Grafiken - Sharkie/1.Sharkie/1.IDLE/1.png");
        this.loadImages(this.IMAGES_SWIMING);
        this.animate();
    }


    animate() {
        setInterval(() => {
            if (!this.world || !this.world.keyboard) return;

            if (this.world.keyboard.RIGHT) {
            this.vx += this.acceleration;
            this.otherDirection = false;
            }
            if (this.world.keyboard.LEFT) {
            this.vx -= this.acceleration;
            this.otherDirection = true;
            }
            if (this.world.keyboard.UP) {
            this.vy -= this.acceleration;
            }
            if (this.world.keyboard.DOWN) {
            this.vy += this.acceleration;
            }

            this.world.x_camera = -this.x;

            this.vx = Math.max(-this.maxSpeed, Math.min(this.vx, this.maxSpeed));
            this.vy = Math.max(-this.maxSpeed, Math.min(this.vy, this.maxSpeed));

            this.x += this.vx;
            this.y += this.vy;

            const anyHorizontal = this.world.keyboard.LEFT || this.world.keyboard.RIGHT;
            const anyVertical = this.world.keyboard.UP || this.world.keyboard.DOWN;

            if (!anyHorizontal) this.vx *= this.friction;
            if (!anyVertical) this.vy *= this.friction;

            if (Math.abs(this.vx) < 0.05) this.vx = 0;
            if (Math.abs(this.vy) < 0.05) this.vy = 0;

            this.y = Math.max(0, Math.min(this.y, this.world.canvas.height - this.height));
            this.x = Math.max(0, Math.min(this.x, 3400 - this.width));

        }, 1000 / 60);

        setInterval(() => {
            if (Math.abs(this.vx) > 0 || Math.abs(this.vy) > 0) {
                this.playAnimation(this.IMAGES_SWIMING);
            }
        }, 120);
    }

    moveUp() {

    }
}
