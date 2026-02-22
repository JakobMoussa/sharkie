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

    WIN_IMAGES = [
        'img/Grafiken - Sharkie/6.Botones/Tittles/You win/Recurso 19.png',
        'img/Grafiken - Sharkie/6.Botones/Tittles/You win/Recurso 20.png',
        'img/Grafiken - Sharkie/6.Botones/Tittles/You win/Recurso 21.png',
        'img/Grafiken - Sharkie/6.Botones/Tittles/You win/Recurso 22.png'
    ]

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

    followSpeed = 2.5;
    followRange = 800;
    attackRange = 200;
    isFollowing = false;
    dead = false;
    deadFrame = 0;

    winSoundPlayed = false;

    winStart = 0;
    winFrame = 0;


    constructor() {
        super();
        this.loadImages(this.SWIM_IMAGES);
        this.loadImages(this.FLOATING_IMAGES);
        this.loadImages(this.HURT_IMAGES);
        this.loadImages(this.ATTACK_IMAGES);
        this.loadImages(this.DEAD_IMAGES);
        this.loadImages(this.WIN_IMAGES);

        this.x = 2000;
        this.y = 200;
        this.baseY = this.y;
    }

    playIntroAnimation() {

        if (this.introRunning) return;

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
        setInterval(() => this.updateMovement(), 1000 / 60);
        setInterval(() => this.updateAnimation(), 150);
    }

    updateMovement() {
        if (!this.world || this.world.gameState !== "play") return;

        const shark = this.world.shark;

        if (!this.hasAppeared) {
            this.tryAppear(shark);
            return;
        }

        if (!this.introPlayed || this.dead) return;

        this.moveOrFloat(shark);
        this.y = Math.max(0, Math.min(this.y, 600 - this.height));
    }

    tryAppear(shark) {
        if (shark.x < this.APPEAR_X) return;

        this.visible = true;
        this.x = this.APPEAR_X + 200;
        this.y = this.SPAWN_Y;
        this.baseY = this.y;

        if (Math.abs(shark.x - this.x) <= this.INTRO_DISTANCE) {
            this.hasAppeared = true;
            this.playIntroAnimation();
        }
    }

    moveOrFloat(shark) {
        const dist = Math.abs(shark.x - this.x);

        if (dist < this.followRange) {
            this.followShark(shark);
            this.baseY = this.y;
        } else {
            this.floatAngle += 0.02;
            this.y = this.baseY + Math.sin(this.floatAngle) * 30;
        }
    }

    updateAnimation() {
        if (!this.world || this.world.gameState !== "play") return;
        if (!this.hasAppeared || !this.introPlayed) return;

        if (this.dead) {
            this.playDeadAnimation();
            return;
        }

        if (Date.now() < this.hurtUntil) {
            this.playAnimation(this.HURT_IMAGES);
            return;
        }

        this.playAttackOrFloat();
    }

    playDeadAnimation() {
        if (!this.winSoundPlayed) {
            this.winSoundPlayed = true;
            this.world.sounds.play("win");
            setTimeout(() => this.world.sounds.stop("win"), 7000);
        }

        if (this.deadFrame >= this.DEAD_IMAGES.length) {
            this.deadDone = true;
            this.deadFrame = this.DEAD_IMAGES.length - 1;
        }

        this.img = this.imageCache[this.DEAD_IMAGES[this.deadFrame]];
        this.deadFrame++;
    }

    playAttackOrFloat() {
        const dist = Math.abs(this.world.shark.x - this.x);

        if (dist < this.attackRange) {
            this.attack = true;
            this.playAnimation(this.ATTACK_IMAGES);
        } else {
            this.attack = false;
            this.playAnimation(this.FLOATING_IMAGES);
        }
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
    
    drawWinCentered(ctx) {
        if (!this.winStart) this.winStart = Date.now();

        const passed = Date.now() - this.winStart;

        if (passed < 5000 && passed % 400 < 20) {
            this.winFrame = (this.winFrame + 1) % this.WIN_IMAGES.length;
        }

        const img = this.imageCache[this.WIN_IMAGES[this.winFrame]];
        if (!img) return;

        const w = ctx.canvas.width * 0.70;
        const h = ctx.canvas.height * 0.40;
        ctx.drawImage(img, (ctx.canvas.width - w) / 2, (ctx.canvas.height - h) / 2, w, h);
    }
    
}