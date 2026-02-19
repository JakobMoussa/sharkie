class Endboss extends MovableObject {
    
    SWIM_IMAGES = [
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

    FLOATING_IMAGES = [
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/1.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/2.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/3.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/4.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/5.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/6.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/7.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/8.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/9.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/10.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/11.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/12.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/2.floating/13.png'
    ];

    ATTACK_IMAGES = [
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/1.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/2.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/3.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/4.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/5.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Attack/6.png'
    ];

    HURT_IMAGES = [
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/1.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/2.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/3.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Hurt/4.png'
    ];

    DEAD_IMAGES = [
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 6.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 7.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 8.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 9.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2 copia 10.png',
        'img/Grafiken - Sharkie/2.Enemy/3 Final Enemy/Dead/Mesa de trabajo 2.png'
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
    visible = false;
    APPEAR_X = 2500;
    SPAWN_Y = 0;
    INTRO_DISTANCE = 800;
    width = 300;
    height = 450;

    energy = 100;
    hurt = false;
    attack = false;

    hurtUntil = 0;
    dead = false;

    followSpeed = 2.5;
    followRange = 800;
    attackRange = 200;
    isFollowing = false;
    dead = false;
    deadFrame = 0;

    winSoundPlayed = false;



    constructor() {
        super();
        this.loadImages(this.SWIM_IMAGES);
        this.loadImages(this.FLOATING_IMAGES);
        this.loadImages(this.HURT_IMAGES);
        this.loadImages(this.ATTACK_IMAGES);
        this.loadImages(this.DEAD_IMAGES);

        this.x = 2000;
        this.y = 200;
        this.baseY = this.y;
    }

    playIntroAnimation() {

        if (this.introRunning) return;
        this.introRunning = true;

        let i = 0;
        const next = () => {
            if (i < this.SWIM_IMAGES.length) {
                const path = this.SWIM_IMAGES[i];
                this.img = this.imageCache[path] || this.img;
                i++;
                setTimeout(next, 180);
                this.world.sounds.play("endbossEntry");
            } else {
                this.introRunning = false;
                this.introPlayed = true;
                this.introPlayed = true;
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
                    this.visible = true;

                    this.x = this.APPEAR_X + 200;
                    this.y = this.SPAWN_Y;
                    this.baseY = this.y;

                    const dist = Math.abs(shark.x - this.x);
                    if (dist <= this.INTRO_DISTANCE) {
                        this.hasAppeared = true;
                        this.playIntroAnimation();
                    }
                }
                return;
            }

            if (!this.introPlayed) return;
            if (this.dead) return;

            const dist = Math.abs(shark.x - this.x);

            if (dist < this.followRange) {
                this.followShark(shark);
                this.baseY = this.y;
            } else {
                this.floatAngle += 0.02;
                this.y = this.baseY + Math.sin(this.floatAngle) * 30;
            }

            this.y = Math.max(0, Math.min(this.y, 600 - this.height));

        }, 1000 / 60);

        setInterval(() => {
            if (!this.world) return;
            if (!this.hasAppeared) return;
            if (!this.introPlayed) return;

            const shark = this.world.shark;
            const dist = Math.abs(shark.x - this.x);

            if (this.dead) {
                if (!this.winSoundPlayed) {
                    this.winSoundPlayed = true;

                    this.world.sounds.play("win");

                    setTimeout(() => {
                        this.world.sounds.stop("win");
                    }, 6000);
                }

                if (this.deadFrame >= this.DEAD_IMAGES.length) {
                    this.deadDone = true;
                    this.deadFrame = this.DEAD_IMAGES.length - 1;
                }

                const path = this.DEAD_IMAGES[this.deadFrame];
                this.img = this.imageCache[path];
                this.deadFrame++;
                return;
            }

            if (Date.now() < this.hurtUntil) {
                this.playAnimation(this.HURT_IMAGES);
                return;
            }

            if (dist < this.attackRange) {
                this.attack = true;
                this.playAnimation(this.ATTACK_IMAGES);
            } else {
                this.attack = false;
                this.playAnimation(this.FLOATING_IMAGES);
            }

        }, 150);

    }

    hit() {
        if (this.dead) return;

        const now = Date.now();
        if (now < this.hurtUntil) return;

        this.energy -= 20;
        this.hurtUntil = now + 400;

        if (this.energy <= 0) {
            this.energy = 0;
            this.dead = true;
        }
    }

    followShark(shark) {
        const dx = shark.x - this.x;
        const dy = shark.y - this.y;

        if (Math.abs(dx) > 10) {
            this.x += (dx > 0 ? this.followSpeed : -this.followSpeed);
        }

        if (Math.abs(dy) > 5) {
            this.y += (dy > 0 ? this.followSpeed * 0.6 : -this.followSpeed * 0.6);
        }

        this.otherDirection = dx > 0;
        this.y = Math.max(0, Math.min(this.y, 600 - this.height));
    }
    
}