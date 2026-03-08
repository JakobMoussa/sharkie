class World {
    /**
     * Creates a new world instance with rendering context and input.
     * @param {HTMLCanvasElement} canvas - Target canvas.
     * @param {Keyboard} keyboard - Shared keyboard state.
     */
    constructor(canvas, keyboard) {
        Object.assign(this, createWorldDefaults());
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.loadImages();
        this.initObjects();
        this.startGame();
    }

    /**
     * Preloads overlay and retry images used by the HUD.
     * @returns {void}
     */
    loadImages() {
        this.overlayImg.src = 'img/Grafiken/3. Background/Dark/1.png';
        this.retryImg.src = 'img/Grafiken/6.Botones/Try again/Recurso 17.png';
    }

    /**
     * Initializes game objects and UI bars.
     * @returns {void}
     */
    initObjects() {
        this.sounds = new SoundEffects();
        const level = createLevel1();
        this.enemies = level.enemies;
        this.backgroundObjects = level.backgroundObjects;
        this.endboss = new Endboss();
        this.endboss.world = this;
        this.statusBar = new StatusBar();
        this.poisonBar = new PoisonBar();
        this.coinsBar = new CoinsBar();
        this.endbossBar = new EndbossStatusBar();
    }

    /**
     * Starts the main game systems.
     * @returns {void}
     */
    startGame() {
        this.setWorld();
        this.endboss.endbossAnimation();
        this.shark.start();
        this.checkCollisions();
        this.spawnPoison();
        this.spawnCoins();
        this.draw();
    }

    /**
     * Assigns world reference to shark.
     * @returns {void}
     */
    setWorld() {
        this.shark.world = this;
    }

    /**
     * Checks win or lose condition.
     * @returns {void}
     */
    checkEndState() {
        if (this.gameState !== "play") return;

        if (this.shark.deadDone) {
            this.gameState = "lose";
            return;
        }

        if (this.endboss.deadDone) {
            this.gameState = "win";
            return;
        }
    }
 
    /**
     * Main render loop.
     * @returns {void}
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.checkEndState();
        this.ctx.save();
        this.ctx.translate(Math.round(this.x_camera), 0);
        this.drawWorld();
        this.ctx.restore();
        this.drawUI();
        requestAnimationFrame(() => this.draw());
        drawMuteButton(this.ctx);
    }

    /**
     * Draws all world objects.
     * @returns {void}
     */
    drawWorld() {
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.poisons);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.poisonShots);
        this.addToMap(this.shark);
        this.addObjectsToMap(this.enemies);
        this.drawEndboss();
    }

    /**
     * Draws endboss and its health bar.
     * @returns {void}
     */
    drawEndboss() {
        if (!this.endboss.visible || this.endboss.deadDone) return;

        this.addToMap(this.endboss);
        if (this.showEndbossBar) {
            this.endbossBar.draw(this.ctx, this.endboss);
        }
    }

    /**
     * Draws UI and overlays.
     * @returns {void}
     */
    drawUI() {
        this.addToMap(this.statusBar);
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinsBar);

        if (this.gameState === "lose" || this.gameState === "win") {
            this.drawEndOverlay();
        }

        if (this.endboss.deadDone) {
            this.endboss.drawWinCentered(this.ctx);
        }
    }

    /**
     * Draws an array of objects.
     *
     * @param {Array} objects - Objects to draw.
     * @returns {void}
     */
    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    /**
     * Draws a single object.
     *
     * @param {MovableObject} mo - Object to draw.
     * @returns {void}
     */
    addToMap(mo) {
        if (!mo.img) return;
        this.ctx.save();

        if (mo.otherDirection) {

            this.ctx.translate(mo.x + mo.width, mo.y);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(mo.img, 0, 0, mo.width, mo.height);
        } else {
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
        this.ctx.restore();
    }

    /**
     * Returns random Y position.
     *
     * @returns {number}
     */
    randomY() {
        return 100 + Math.random() * 400;
    }

    /**
     * Updates pufferfish "near" state.
     *
     * @param {MovableObject} enemy - Enemy instance.
     * @returns {void}
     */
    updatePufferNear(enemy) {
        if (!(enemy instanceof PufferFish) || enemy.dead) return;

        const sx = this.shark.x + this.shark.width / 2;
        const sy = this.shark.y + this.shark.height / 2;
        const ex = enemy.x + enemy.width / 2;
        const ey = enemy.y + enemy.height / 2;

        const nearX = Math.abs(sx - ex) < 300;
        const nearY = Math.abs(sy - ey) < 200;

        enemy.setNear(nearX && nearY);
    }

    /**
     * Attempts to kill enemy with slap.
     *
     * @param {MovableObject} enemy
     * @returns {boolean}
     */
    trySlapKill(enemy) {
        if (!this.shark.slap) return false;

        if (enemy instanceof PufferFish && !enemy.dead) {
            enemy.die();
            return true;
        }

        if (enemy instanceof JellyFish && !enemy.dead) {
            enemy.die();
            return true;
        }

        return false;
    }

    /**
     * Applies enemy damage to shark.
     *
     * @param {MovableObject} enemy
     * @returns {boolean}
     */
    applyEnemyDamage(enemy) {
        if (enemy.dead) return false;

        const didDamage =
            enemy instanceof JellyFish ? this.applyJellyDamage() :
            enemy instanceof PufferFish ? this.applyPufferDamage() :
            false;

        this.clampSharkEnergy();
        if (didDamage) this.statusBar.setPercentage(this.shark.energy);
        return didDamage;
    }

    /**
     * Applies electric shock damage from a jellyfish.
     * @returns {boolean} True if damage was applied.
     */
    applyJellyDamage() {
        return this.shark.hitShock(800);
    }

    /**
     * Applies poison damage from a pufferfish.
     * @returns {boolean} True if damage was applied.
     */
    applyPufferDamage() {
        return this.shark.hitPoison(1200);
    }

    /**
     * Prevents shark energy from dropping below zero.
     * @returns {void}
     */
    clampSharkEnergy() {
        if (this.shark.energy <= 0) this.shark.energy = 0;
    }

    /**
     * Removes finished enemies.
     * @returns {void}
     */
    cleanupDeadEnemies() {
        this.enemies = this.enemies.filter(e => !e.deadDone);
    }

    /**
     * Starts collision detection loop.
     * @returns {void}
     */
    checkCollisions() {
        this.collisionInterval = setInterval(() => {
            if (this.gameState !== "play") return;

            this.checkEnemyCollisions();
            this.checkEndbossCollisions();
            this.checkCoins();
            this.ckeckPoisons();
            this.checkPoisonShotHits();
            this.cleanupDeadEnemies();
            this.shootPoison();
            this.cleanupShots();

        }, 1000 / 60);
    }

    /**
     * Handles enemy collisions.
     * @returns {void}
     */
    checkEnemyCollisions() {
        this.enemies.forEach((enemy) => {
            this.updatePufferNear(enemy);

            const hit = this.shark.isCollidingEnemy(enemy);

            if (hit)  {
                if (this.trySlapKill(enemy)) return;
                const tookDamage = this.applyEnemyDamage(enemy);
                if (tookDamage) {
                    if (this.sounds) this.sounds.play("sharkHurt");
                }
            }
        });
    }

    /**
     * Handles endboss collisions.
     * @returns {void}
     */
    checkEndbossCollisions() {
        if (!this.endboss.visible || this.endboss.dead) return;
        this.checkEndbossSlapHit();
        this.checkEndbossDamageToShark();
        if (this.endboss.deadDone) this.showEndbossBar = false;
    }

    /**
     * Applies slap damage from the shark to the endboss.
     * @returns {void}
     */
    checkEndbossSlapHit() {
        if (this.shark.slap && this.shark.isCollidingBoss(this.endboss)) {
            this.endboss.hit();
            this.showEndbossBar = true;
            this.endbossBar.setPercentage(this.endboss.energy);
        }
    }

    /**
     * Applies contact damage from the endboss to the shark.
     * @returns {void}
     */
    checkEndbossDamageToShark() {
        const oldY = this.shark.y;
        this.shark.y = oldY + 40;
        const hit = this.shark.isCollidingBoss(this.endboss);
        this.shark.y = oldY;
        if (hit) {
            const didDamage = this.shark.hitShock(800);
            if (didDamage && this.sounds) this.sounds.play("sharkHurt");
        }
    }

    /**
     * Spawns poison items.
     * @returns {void}
     */
    spawnPoison() {
        for (let i = 0; i < 30; i++) {
            const x = 300 + Math.random() * 2800;
            const y = this.randomY();
            this.poisons.push(new Poison(x, y));
        }
    }

    /**
     * Handles poison collection.
     * @returns {void}
     */
    ckeckPoisons() {
        this.poisons.forEach((poison, index) => {
            if (this.poisonCount >= this.maxPoison) return;

            if (this.shark.isCollidingItem(poison)) {
                this.poisons.splice(index, 1);

                this.poisonCount++;
                if (this.sounds) { this.sounds.play("poison"); };
                const percent = (this.poisonCount / this.maxPoison) * 100;
                this.poisonBar.setPercentage(percent);
            }
        });
    }

    /**
     * Spawns coin items.
     * @returns {void}
     */
    spawnCoins() {
        for (let i = 0; i < 20; i++) {
            const x = 300 + Math.random() * 2600;
            const y = this.randomY();
            this.coins.push(new Coin(x, y));
        }
    }

    /**
     * Handles coin collection.
     * @returns {void}
     */
    checkCoins() {
        this.coins.forEach((coin, index) => {
            
            if (this.shark.isCollidingItem(coin)) {
                this.coins.splice(index, 1);

                this.coinCount++;
                const percent = (this.coinCount / this.maxCoins) * 100;
                this.coinsBar.setPercentage(percent);
                this.sounds.play("coin");
            }
        });
    }

    /**
     * Shoots poison projectile.
     * @returns {void}
     */
    shootPoison() {
        if (!this.shark.shotReady) return;
        if (this.poisonCount <= 0) return;

        const facingLeft = this.shark.otherDirection === true;
        const x = facingLeft ? this.shark.x - 20 : this.shark.x + this.shark.width;
        const y = this.shark.y + this.shark.height / 2;

        this.poisonShots.push(new PoisonShot(x, y, facingLeft));

        this.poisonCount--;
        const percent = (this.poisonCount / this.maxPoison) * 100;
        this.poisonBar.setPercentage(percent);

        this.shark.shotReady = false;
    }

    /**
     * Removes out-of-bounds shots.
     * @returns {void}
     */
    cleanupShots() {
        this.poisonShots = this.poisonShots.filter(s => s.x > -200 && s.x < 4000);
    }

    /**
     * Checks projectile collisions.
     * @returns {void}
     */
    checkPoisonShotHits() {
        this.poisonShots.forEach((shot) => {
            this.checkShotEnemyHits(shot);
            this.checkShotEndbossHit(shot);
        });
        this.poisonShots = this.poisonShots.filter(s => !s.hit);
    }

    /**
     * Tests a poison shot against regular enemies.
     * @param {PoisonShot} shot - Projectile to test.
     * @returns {void}
     */
    checkShotEnemyHits(shot) {
        this.enemies.forEach((enemy) => {
            if (enemy.dead) return;
            if (shot.isColliding(enemy, 0, 0) && typeof enemy.die === 'function') {
                enemy.die();
                shot.hit = true;
            }
        });
    }

    /**
     * Tests a poison shot against the endboss and updates its bar.
     * @param {PoisonShot} shot - Projectile to test.
     * @returns {void}
     */
    checkShotEndbossHit(shot) {
        if (!this.endboss.visible || this.endboss.dead) return;
        if (shot.isColliding(this.endboss, 0, 0)) {
            this.endboss.hit();
            shot.hit = true;
            this.showEndbossBar = true;
            this.endbossBar.setPercentage(this.endboss.energy);
        }
    }

    /**
     * Draws end overlay (win/lose).
     * @returns {void}
     */
    drawEndOverlay() {

        if (this.overlayImg.complete) {
            this.ctx.drawImage(this.overlayImg, 0, 0, this.canvas.width, this.canvas.height);
        }

        if (this.gameState === "lose") {
            this.shark.drawGameOverCentered(this.ctx);
        }

        if (this.gameState === "win") {
            this.endboss.drawWinCentered(this.ctx);
        }

        this.drawRetryButton();
    }

    /**
     * Draws retry button.
     * @returns {void}
     */
    drawRetryButton() {
        // Buttons sind via CSS zentriert; hier nur anzeigen
        this.retryBtn = { x: 0, y: 0, w: 0, h: 0 };
        this.positionRetryButton();
        this.positionBackButton();
    }

    /**
     * Shows the retry button on the end overlay.
     * @returns {void}
     */
    positionRetryButton() {
        const btn = document.getElementById("retryHitbox");
        if (!btn) return;
        btn.style.display = "block";
    }

    /**
     * Shows the back-to-options button on the end overlay.
     * @returns {void}
     */
    positionBackButton() {
        const btn = document.getElementById("backToOptions");
        if (!btn) return;
        btn.style.display = "block";
    }

    /**
     * Stops collision loop and hides overlay buttons.
     * @returns {void}
     */
    destroy() {
        if (this.collisionInterval) {
            clearInterval(this.collisionInterval);
            this.collisionInterval = null;
        }
        this.gameState = "stopped";
        const btn = document.getElementById("retryHitbox");
        if (btn) btn.style.display = "none";
        const back = document.getElementById("backToOptions");
        if (back) back.style.display = "none";
    }

}
