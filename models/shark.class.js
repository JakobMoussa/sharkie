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
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I1.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I2.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I3.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I4.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I5.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I6.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I7.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I8.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I9.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I10.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I11.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I12.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I13.png',
        'img/Grafiken - Sharkie/1.Sharkie/2.Long_IDLE/I14.png'
    ];

    SWIM_IMAGES = [
        'img/Grafiken - Sharkie/1.Sharkie/3.Swim/1.png',
        'img/Grafiken - Sharkie/1.Sharkie/3.Swim/2.png',
        'img/Grafiken - Sharkie/1.Sharkie/3.Swim/3.png',
        'img/Grafiken - Sharkie/1.Sharkie/3.Swim/4.png',
        'img/Grafiken - Sharkie/1.Sharkie/3.Swim/5.png',
        'img/Grafiken - Sharkie/1.Sharkie/3.Swim/6.png'
    ];

    DEAD_IMAGES = [
        'img/Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/1.png',
        'img/Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/2.png',       
        'img/Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/3.png',
        'img/Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/4.png',
        'img/Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/5.png',
        'img/Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/6.png',
        'img/Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/7.png',
        'img/Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/8.png',
        'img/Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/9.png',
        'img/Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/10.png',
        'img/Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/11.png',
        'img/Grafiken - Sharkie/1.Sharkie/6.dead/1.Poisoned/12.png'
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

    FINSLAP_IMAGES = [
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/1.png',
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/2.png',
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/3.png',
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/4.png',
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/5.png',
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/6.png',
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/7.png',
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Fin slap/8.png'
    ];

    SHOT_IMAGES = [
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/For Whale/1.png',
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/For Whale/2.png',
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/For Whale/3.png',
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/For Whale/4.png',
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/For Whale/5.png',
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/For Whale/6.png',
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/For Whale/7.png',
        'img/Grafiken - Sharkie/1.Sharkie/4.Attack/Bubble trap/For Whale/8.png'
    ];

    GAME_OVER = [
        'img/Grafiken - Sharkie/6.Botones/Tittles/Game Over/Recurso 9.png',
        'img/Grafiken - Sharkie/6.Botones/Tittles/Game Over/Recurso 10.png',
        'img/Grafiken - Sharkie/6.Botones/Tittles/Game Over/Recurso 11.png',
        'img/Grafiken - Sharkie/6.Botones/Tittles/Game Over/Recurso 12.png',
        'img/Grafiken - Sharkie/6.Botones/Tittles/Game Over/Recurso 13.png'
    ];

    currentImage = 0;
    world;
    speed = 10;
    Keyboard;
    vx = 0;
    vy = 0;
    energy = 100;
    acceleration = 0.6;
    maxSpeed = 6;
    friction = 0.85;
    state = "idle";
    lastMoveTime = Date.now();
    poisonUntil = 0;
    shockUntil = 0;
    slap = false;
    slapUntil = 0;
    slapCooldownUntil = 0;
    shoot = false;
    shootUntil = 0;
    shotReady = false;
    deadDone = false;
    deadFrame = 0;
    gameOverFrame = 0;
    losePlayed = false;
    gameOverStart = 0;

    constructor() {
        super();
        this.loadImage(this.IDLE_IMAGES[0]);

        this.loadImages(this.IDLE_IMAGES);
        this.loadImages(this.LONGIDLE_IMAGES);
        this.loadImages(this.SWIM_IMAGES);
        this.loadImages(this.DEAD_IMAGES);
        this.loadImages(this.POISONED_IMAGES);
        this.loadImages(this.ELECTRICSHOCK_IMAGES);
        this.loadImages(this.FINSLAP_IMAGES);
        this.loadImages(this.SHOT_IMAGES);
        this.loadImages(this.GAME_OVER);
    }

    setSlap() {
        const now = Date.now();

        if (this.world.keyboard.SPACE && now >= this.slapCooldownUntil) {
            this.slapUntil = now + 350;
            this.slapCooldownUntil = now + 600;

            if (this.world.sounds) this.world.sounds.play("sharkSlap");
        }

        this.slap = now < this.slapUntil;
    }

    setShoot() {
        const now = Date.now();

        if (this.world.keyboard.F && !this.shoot) {
            this.shoot = true;
            this.shotReady = false;
            this.shootUntil = now + (this.SHOT_IMAGES.length * 120);
            if (this.world.sounds) this.world.sounds.play("bubble");
        }

        if (this.shoot && now >= this.shootUntil) {
            this.shoot = false;
            this.shotReady = true;
        }
    }

    start() {
        this.startMovementLoop();
        this.startAnimationLoop();
    } 

    startMovementLoop() {
        setInterval(() => this.updateMovement(), 1000 / 60);
    }

    updateMovement() {
        if (this.world?.gameState !== "play") return;
        if (!this.world || !this.world.keyboard) return;
        if (this.energy <= 0) return;
            this.setSlap();
            this.setShoot();
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
            this.gameOverScreen();
        }, 120);
    }

    updateState() {
        const now = Date.now();

        if (this.energy <= 0) {this.state = "dead"; return; }

        const moving = (Math.abs(this.vx) > 0.05 || Math.abs(this.vy) > 0.05);

        if (now < this.shockUntil) { this.state = "shock"; return; }
        if (now < this.poisonUntil) { this.state = "poisoned"; return; }
        if (this.shoot) { this.state = "shoot"; return; }
        if (this.slap) { this.state = "slap"; return; }
        if (moving) { this.state = "swim"; return; }


        const idleTime = now - this.lastMoveTime;
        this.state = (idleTime > 3000) ? "longidle" : "idle";
    }

    updateAnimation() {
        switch (this.state) {
            case "dead":
            this.playAnimation(this.DEAD_IMAGES);
            break;
            case "shock":
            this.playAnimation(this.ELECTRICSHOCK_IMAGES);
            break;
            case "poisoned":
            this.playAnimation(this.POISONED_IMAGES);
            break;
            case "slap":
            this.playAnimation(this.FINSLAP_IMAGES);
            break;
            case "swim":
            this.playAnimation(this.SWIM_IMAGES);
            break;
            case "longidle":
            this.playAnimation(this.LONGIDLE_IMAGES);
            break;
            case "shoot":
            this.playAnimation(this.SHOT_IMAGES);
            break;
            default:
            this.playAnimation(this.IDLE_IMAGES);
        }
    }   

    hitShock(durationMs = 800) {
        const now = Date.now();
        if (now < this.shockUntil) return false;

        this.energy -= 10;
        if (this.energy < 0) this.energy = 0;

        this.shockUntil = now + durationMs;
        return true;
    }

    hitPoison(durationMs = 1200) {
        const now = Date.now();
        if (now < this.poisonUntil) return false;

        this.energy -= 5;
        if (this.energy < 0) this.energy = 0;

        this.poisonUntil = now + durationMs;
        return true;
    }

    drawGameOverCentered(ctx) {
        if (!this.gameOverStart) this.gameOverStart = Date.now();

        const passed = Date.now() - this.gameOverStart;

        if (passed < 5000 && passed % 400 < 20) {
            this.gameOverFrame = (this.gameOverFrame + 1) % this.GAME_OVER.length;
        }

        const img = this.imageCache[this.GAME_OVER[this.gameOverFrame]];
        if (!img) return;

        const w = ctx.canvas.width * 0.75;
        const h = ctx.canvas.height * 0.45;
        ctx.drawImage(img, (ctx.canvas.width - w) / 2, (ctx.canvas.height - h) / 2, w, h);
    }

    gameOverScreen() {
        if (this.energy > 0) return;

        if (!this.deadDone) {
            const path = this.DEAD_IMAGES[this.deadFrame];
            this.img = this.imageCache[path];
            this.deadFrame++;

            if (this.deadFrame >= this.DEAD_IMAGES.length) {
                this.deadDone = true;
                this.gameOverFrame = 0;
            }
            return;
        }

        this.gameOverFrame = (this.gameOverFrame + 1) % this.GAME_OVER.length;

        if (!this.losePlayed) {
            this.losePlayed = true;
            setTimeout(() => {
                if (this.world?.sounds) this.world.sounds.play("lose");
            }, 500);
        }
    }

}
