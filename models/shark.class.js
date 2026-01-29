class Shark extends MovableObject {
    IDLE_IMAGES = [   
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
        'img/Grafiken - Sharkie/1.Sharkie/1.IDLE/18.png'
    ];

    LONGIDLE_IMAGES = [
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i1.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i2.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i3.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i4.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i5.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i6.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i7.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i8.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i9.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i10.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i11.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i12.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i13.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/i14.png'
    ];

    SWIM_IMAGES = [
        'img/Grafiken - Sharkie/1.Sharkie/3.Swim/1.png',
        'img/Grafiken - Sharkie/1.Sharkie/3.Swim/2.png',
        'img/Grafiken - Sharkie/1.Sharkie/3.Swim/3.png',
        'img/Grafiken - Sharkie/1.Sharkie/3.Swim/4.png',
        'img/Grafiken - Sharkie/1.Sharkie/3.Swim/5.png',
        'img/Grafiken - Sharkie/1.Sharkie/3.Swim/6.png'
    ];


    ELECTRICSHOCK_IMAGES = [
        'img/Grafiken - Sharkie/1.Sharkie/5.Hurt/2.Electric shock/1.png',
        'img/Grafiken - Sharkie/1.Sharkie/5.Hurt/2.Electric shock/2.png'
    ];

    POISONED_IMAGES = [
        'img/Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/1.png',
        'img/Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/2.png',
        'img/Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/3.png',
        'img/Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/4.png',
        'img/Grafiken - Sharkie/1.Sharkie/5.Hurt/1.Poisoned/5.png'
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

    state = "idle";
    lastMoveTime = Date.now();

    poisonUntil = 0;
    shockUntil = 0;

    constructor() {
        super();
        this.loadImage(this.IDLE_IMAGES[0]);

        this.loadImages(this.IDLE_IMAGES);
        this.loadImages(this.LONGIDLE_IMAGES);
        this.loadImages(this.SWIM_IMAGES);
        this.loadImages(this.POISONED_IMAGES);
        this.loadImages(this.ELECTRICSHOCK_IMAGES);
    }

    start() {
        this.startMovementLoop();
        this.startAnimationLoop();
    } 

    startMovementLoop() {
        setInterval(() => this.updateMovement(), 1000 / 60);
    }

    updateMovement() {
        if (!this.world || !this.world.keyboard) return;
            this.applyInputAcceleration();
            this.applyClampSpeed();
            this.applyPosition();
            this.applyCamera();
            this.applyFriction();
            this.applyBounds();
            this.updateLastMoveTime();
    }

    applyInputAcceleration() {
        if (this.world.keyboard.RIGHT) { this.vx += this.acceleration; this.otherDirection = false; }
        if (this.world.keyboard.LEFT)  { this.vx -= this.acceleration; this.otherDirection = true; }
        if (this.world.keyboard.UP)    { this.vy -= this.acceleration; }
        if (this.world.keyboard.DOWN)  { this.vy += this.acceleration; }
    }
    
    applyClampSpeed() {
        this.vx = Math.max(-this.maxSpeed, Math.min(this.vx, this.maxSpeed));
        this.vy = Math.max(-this.maxSpeed, Math.min(this.vy, this.maxSpeed));
    }

    applyPosition() {
        this.x += this.vx;
        this.y += this.vy;
    }

    applyCamera() {
        this.world.x_camera = -this.x;
    }

    applyFriction() {
        const anyHorizontal = this.world.keyboard.LEFT || this.world.keyboard.RIGHT;
        const anyVertical = this.world.keyboard.UP || this.world.keyboard.DOWN;

        if (!anyHorizontal) this.vx *= this.friction;
        if (!anyVertical) this.vy *= this.friction;

        if (Math.abs(this.vx) < 0.05) this.vx = 0;
        if (Math.abs(this.vy) < 0.05) this.vy = 0;
    }

    applyBounds() {
        this.y = Math.max(-90, Math.min(this.y, this.world.canvas.height - this.height));
        this.x = Math.max(0, Math.min(this.x, 3800 - this.width));
    }

    updateLastMoveTime() {
        const moving = (Math.abs(this.vx) > 0.05 || Math.abs(this.vy) > 0.05);
        if (moving) this.lastMoveTime = Date.now();
    }

    startAnimationLoop() {
        setInterval(() => {
            this.updateState();
            this.updateAnimation();
        }, 120);
    }

    updateState() {
        const now = Date.now();
        const moving = (Math.abs(this.vx) > 0.05 || Math.abs(this.vy) > 0.05);

        if (now < this.shockUntil) { this.state = "shock"; return; }
        if (now < this.poisonUntil) { this.state = "poisoned"; return; }
        if (moving) { this.state = "swim"; return; }

        const idleTime = now - this.lastMoveTime;
        this.state = (idleTime > 3000) ? "longidle" : "idle";
    }

    updateAnimation() {
        switch (this.state) {
            case "shock":
            this.playAnimation(this.ELECTRICSHOCK_IMAGES);
            break;
            case "poisoned":
            this.playAnimation(this.POISONED_IMAGES);
            break;
            case "swim":
            this.playAnimation(this.SWIM_IMAGES);
            break;
            case "longidle":
            this.playAnimation(this.LONGIDLE_IMAGES);
            break;
            default:
            this.playAnimation(this.IDLE_IMAGES);
        }
    }

    hitPoison(durationMs = 1200) {
        this.poisonUntil = Date.now() + durationMs;
    }

    hitShock(durationMs = 800) {
        this.shockUntil = Date.now() + durationMs;
    }

}
