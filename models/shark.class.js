class Shark extends MovableObject {
    
    IDLE_IMAGES = SHARK_IMAGES.IDLE;
    LONGIDLE_IMAGES = SHARK_IMAGES.LONGIDLE;
    SLEEP_IMAGES = SHARK_IMAGES.SLEEP;
    SWIM_IMAGES = SHARK_IMAGES.SWIM;
    DEAD_IMAGES = SHARK_IMAGES.DEAD;
    ELECTRICSHOCK_IMAGES = SHARK_IMAGES.ELECTRICSHOCK;
    POISONED_IMAGES = SHARK_IMAGES.POISONED;
    FINSLAP_IMAGES = SHARK_IMAGES.FINSLAP;
    SHOT_IMAGES = SHARK_IMAGES.SHOT;
    GAME_OVER = SHARK_IMAGES.GAME_OVER;

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
    shootFrameStart = 0;
    shootFrameDuration = 120;
    deadDone = false;
    deadFrame = 0;
    gameOverFrame = 0;
    losePlayed = false;
    gameOverStart = 0;
    slapEndedHandled = false;
    shootEndedHandled = false;

    constructor() {
        super();
        this.loadImage(this.IDLE_IMAGES[0]);

        this.loadImages(this.IDLE_IMAGES);
        this.loadImages(this.LONGIDLE_IMAGES);
        this.loadImages(this.SLEEP_IMAGES);
        this.loadImages(this.SWIM_IMAGES);
        this.loadImages(this.DEAD_IMAGES);
        this.loadImages(this.POISONED_IMAGES);
        this.loadImages(this.ELECTRICSHOCK_IMAGES);
        this.loadImages(this.FINSLAP_IMAGES);
        this.loadImages(this.SHOT_IMAGES);
        this.loadImages(this.GAME_OVER);
    }

    /**
     * Handles slap attack activation and cooldown logic.
     *
     * @returns {void}
     */
    setSlap() {
        const now = Date.now();

        if (this.world.keyboard.SPACE && now >= this.slapCooldownUntil) {
            this.lastMoveTime = now;
            this.slapUntil = now + 350;
            this.slapCooldownUntil = now + 600;

            if (this.world.sounds) this.world.sounds.play("sharkSlap");
        }

        this.slap = now < this.slapUntil;
    }

    /**
     * Handles bubble shooting logic and animation timing.
     *
     * @returns {void}
     */
    setShoot() {
        const now = Date.now();
        this.startShootIfPressed(now);
        this.finishShootIfDone(now);
        this.markShootEnded(now);
    }

    /**
     * Begins a shooting action when the shoot key is pressed.
     * @param {number} now - Current timestamp in ms.
     * @returns {void}
     */
    startShootIfPressed(now) {
        if (!this.world.keyboard.F || this.shoot || this.world.poisonCount <= 0) return;
        this.shoot = true;
        this.shotReady = false;
        this.currentImage = 0;
        this.shootFrameStart = now;
        this.shootUntil = now + (this.SHOT_IMAGES.length * this.shootFrameDuration);
        this.shootEndedHandled = false;
        if (this.world.sounds) this.world.sounds.play("bubble");
    }

    /**
     * Finishes shooting once the animation duration has elapsed.
     * @param {number} now - Current timestamp in ms.
     * @returns {void}
     */
    finishShootIfDone(now) {
        if (!this.shoot || now < this.shootUntil) return;
        this.shoot = false;
        this.shotReady = true;
    }

    /**
     * Resets shoot state bookkeeping after the shot has completed.
     * @param {number} now - Current timestamp in ms.
     * @returns {void}
     */
    markShootEnded(now) {
        if (this.shoot || this.shootEndedHandled || now < this.shootUntil) return;
        this.lastMoveTime = Date.now();
        this.shootEndedHandled = true;
    }

    /**
     * Starts movement and animation loops.
     *
     * @returns {void}
     */
    start() {
        this.startMovementLoop();
        this.startAnimationLoop();
        this.setHitbox(60, 50, 120, 65);

    } 

    /**
     * Starts the continuous movement update loop.
     *
     * @returns {void}
     */
    startMovementLoop() {
        setInterval(() => this.updateMovement(), 1000 / 60);
    }

    /**
    * Updates movement physics, input handling,
    * camera movement and boundary checks.
    *
    * @returns {void}
    */
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

    /**
     * Applies acceleration based on keyboard input.
     *
     * @returns {void}
     */
    applyInputAcceleration() {
        if (this.world.keyboard.RIGHT) { this.vx += this.acceleration; this.otherDirection = false; }
        if (this.world.keyboard.LEFT)  { this.vx -= this.acceleration; this.otherDirection = true; }
        if (this.world.keyboard.UP)    { this.vy -= this.acceleration; }
        if (this.world.keyboard.DOWN)  { this.vy += this.acceleration; }
    }

    /**
     * Limits velocity to maximum speed.
     *
     * @returns {void}
     */
    applyClampSpeed() {
        this.vx = Math.max(-this.maxSpeed, Math.min(this.vx, this.maxSpeed));
        this.vy = Math.max(-this.maxSpeed, Math.min(this.vy, this.maxSpeed));
    }

    /**
     * Updates position based on velocity.
     *
     * @returns {void}
     */
    applyPosition() {
        this.x += this.vx;
        this.y += this.vy;
    }

    /**
     * Updates world camera position relative to shark.
     *
     * @returns {void}
     */
    applyCamera() {
        this.world.x_camera = -this.x;
    }

    /**
     * Applies friction when no directional input is active.
     *
     * @returns {void}
     */
    applyFriction() {
        const anyHorizontal = this.world.keyboard.LEFT || this.world.keyboard.RIGHT;
        const anyVertical = this.world.keyboard.UP || this.world.keyboard.DOWN;

        if (!anyHorizontal) this.vx *= this.friction;
        if (!anyVertical) this.vy *= this.friction;

        if (Math.abs(this.vx) < 0.05) this.vx = 0;
        if (Math.abs(this.vy) < 0.05) this.vy = 0;
    }

    /**
     * Restricts shark movement within world boundaries.
     *
     * @returns {void}
     */
    applyBounds() {
        this.y = Math.max(-90, Math.min(this.y, this.world.canvas.height - this.height));
        this.x = Math.max(0, Math.min(this.x, 3800 - this.width));
    }
    
    /**
     * Updates last movement timestamp if shark is moving.
     *
     * @returns {void}
     */

    updateLastMoveTime() {
        if (
            this.world.keyboard.LEFT ||
            this.world.keyboard.RIGHT ||
            this.world.keyboard.UP ||
            this.world.keyboard.DOWN
        ) {
            this.lastMoveTime = Date.now();
        }
    }

    /**
     * Starts animation update loop.
     *
     * @returns {void}
     */
    startAnimationLoop() {
        setInterval(() => {
            this.updateState();
            this.updateAnimation();
            this.gameOverScreen();
        }, 120);
    }

    /**
     * Updates the state machine in priority order.
     * @returns {void}
     */
    updateState() {
        const now = Date.now();
        if (this.handleDeadState()) return;
        if (this.handleStatusEffects(now)) return;
        if (this.handleAttackStates()) return;
        if (this.handleMovementState()) return;
        this.handleIdleState(now);
    }

    /**
     * Switches to dead state when energy is depleted.
     * @returns {boolean} True if state changed.
     */
    handleDeadState() {
        if (this.energy > 0) return false;
        this.state = "dead";
        return true;
    }

    /**
     * Handles temporary status effects (shock/poison).
     * @param {number} now - Current timestamp in ms.
     * @returns {boolean} True if a status effect state was set.
     */
    handleStatusEffects(now) {
        if (now < this.shockUntil) { this.state = "shock"; return true; }
        if (now < this.poisonUntil) { this.state = "poisoned"; return true; }
        return false;
    }

    /**
     * Prioritizes attack states over movement/idle.
     * @returns {boolean} True if an attack state was set.
     */
    handleAttackStates() {
        if (this.shoot) { this.state = "shoot"; return true; }
        if (this.slap) { this.state = "slap"; return true; }
        return false;
    }

    /**
     * Sets swimming state when velocity exceeds a small threshold.
     * @returns {boolean} True if swimming.
     */
    handleMovementState() {
        const moving = (Math.abs(this.vx) > 0.05 || Math.abs(this.vy) > 0.05);
        if (!moving) return false;
        this.state = "swim";
        return true;
    }

    /**
     * Chooses idle/long-idle/sleep based on inactivity duration.
     * @param {number} now - Current timestamp in ms.
     * @returns {void}
     */
    handleIdleState(now) {
        const idleTime = now - this.lastMoveTime;
        if (idleTime > 8000) { this.state = "sleep"; return; }
        if (idleTime > 3000) { this.state = "longidle"; return; }
        this.state = "idle";
    }

    /**
     * Plays animation according to current state.
     *
     * @returns {void}
     */
    updateAnimation() {
        const frames = this.getAnimationFramesForState();
        if (!frames) return;
        if (this.state === "shoot") {
            this.playShootAnimation(Date.now());
            return;
        }
        this.playAnimation(frames);
    }   

    /**
     * Plays the shoot animation with time-based frame stepping (no looping).
     * @param {number} now - Current timestamp in ms.
     * @returns {void}
     */
    playShootAnimation(now) {
        const duration = this.shootFrameDuration || 100;
        const elapsed = now - this.shootFrameStart;
        const frameIndex = Math.min(
            Math.floor(elapsed / duration),
            this.SHOT_IMAGES.length - 1
        );

        const path = this.SHOT_IMAGES[frameIndex];
        this.img = this.imageCache[path] || this.img;
    }

    /**
     * Maps current state to the corresponding animation frames.
     * @returns {string[]|null} Frame list or null for dead state.
     */
    getAnimationFramesForState() {
        const map = {
            shock: this.ELECTRICSHOCK_IMAGES,
            poisoned: this.POISONED_IMAGES,
            slap: this.FINSLAP_IMAGES,
            swim: this.SWIM_IMAGES,
            longidle: this.LONGIDLE_IMAGES,
            sleep: this.SLEEP_IMAGES,
            shoot: this.SHOT_IMAGES,
            dead: null
        };
        return map[this.state] ?? this.IDLE_IMAGES;
    }

    /**
     * Applies electric shock damage.
     *
     * @param {number} [durationMs=800] - Shock duration in milliseconds.
     * @returns {boolean} True if damage was applied.
     */
    hitShock(durationMs = 800) {
        const now = Date.now();
        if (now < this.shockUntil) return false;

        this.energy -= 20;
        if (this.energy < 0) this.energy = 0;

        if (this.world) { this.world.statusBar.setPercentage(this.energy); }

        this.shockUntil = now + durationMs;
        return true;
    }

    /**
     * Applies poison damage.
     *
     * @param {number} [durationMs=1200] - Poison duration in milliseconds.
     * @returns {boolean} True if damage was applied.
     */
    hitPoison(durationMs = 1200) {
        const now = Date.now();
        if (now < this.poisonUntil) return false;

        this.energy -= 20;
        if (this.energy < 0) this.energy = 0;

        if (this.world) { this.world.statusBar.setPercentage(this.energy); }

        this.poisonUntil = now + durationMs;
        return true;
    }

    /**
     * Draws the game over animation centered on canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     * @returns {void}
     */
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

    /**
     * Handles the full game over sequence.
     * Plays death animation, game over loop and sound.
     *
     * @returns {void}
     */
    gameOverScreen() {
        if (this.energy > 0) return;
        if(!this.deadDone) {
            this.playDeadAnimation();
            return;
        }

        this.playGameOverLoop();
        this.playLoseSound();
    }

    /**
     * Plays shark death animation frames.
     *
     * @returns {void}
     */
    playDeadAnimation() {
        this.img = this.imageCache[this.DEAD_IMAGES[this.deadFrame]];
        this.deadFrame++;

        if (this.deadFrame >= this.DEAD_IMAGES.length) {
            this.deadDone = true;
            this.gameOverFrame = 0;
        }   
    }

    /**
     * Loops game over animation frames.
     *
     * @returns {void}
     */
    playGameOverLoop() {
        this.gameOverFrame = (this.gameOverFrame + 1) % this.GAME_OVER.length;
    }

    /**
     * Plays lose sound once after death.
     *
     * @returns {void}
     */
    playLoseSound() {
        if (this.losePlayed) return;
        this.losePlayed = true;
        setTimeout(() => {
            if (this.world?.sounds) this.world.sounds.play("lose");
        }, 500);
    }
}
