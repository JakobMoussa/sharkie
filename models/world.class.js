class World {
    shark = new Shark();
    enemies = Level1.enemies;
    backgroundObjects = Level1.backgroundObjects;

    canvas;
    ctx;
    keyboard;
    endboss;
    x_camera = 0;
    statusBar;
    poisonBar;
    poisons = [];
    poisonCount = 0;
    maxPoison = 10;
    coinsBar;
    coins = [];
    coinCount = 0;
    maxCoins = 20;
    poisonShots = [];
    endbossBar;
    showEndbossBar = false;
    gameState = "play";
    overlayImg = new Image();
    collisionInterval = null;
    retryImg = new Image();
    retryBtn = {x: 0, y: 0, w: 0, h: 0};

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.loadImages();
        this.initObjects();
        this.startGame();
    }

    loadImages() {
        this.overlayImg.src = 'img/Grafiken - Sharkie/3. Background/Dark/1.png';
        this.retryImg.src = 'img/Grafiken - Sharkie/6.Botones/Try again/Recurso 17.png';
    }

    initObjects() {
        this.sounds = new SoundEffects();
        this.endboss = new Endboss();
        this.endboss.world = this;
        this.statusBar = new StatusBar();
        this.poisonBar = new PoisonBar();
        this.coinsBar = new CoinsBar();
        this.endbossBar = new EndbossStatusBar();
    }

    startGame() {
        this.setWorld();
        this.endboss.endbossAnimation();
        this.shark.start();
        this.checkCollisions();
        this.spawnPoison();
        this.spawnCoins();
        this.draw();
    }


    setWorld() {
        this.shark.world = this;
    }

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
 
    // draw() {
    //     this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //     this.checkEndState();
    //     this.ctx.save();

    //     this.ctx.translate(this.x_camera, 0);

    //     this.addObjectsToMap(this.backgroundObjects);
    //     this.addObjectsToMap(this.poisons);
    //     this.addObjectsToMap(this.coins);
    //     this.addObjectsToMap(this.poisonShots);

    //     if (this.endboss.visible && !this.endboss.deadDone) {
    //         this.addToMap(this.endboss);

    //         if (this.showEndbossBar) {
    //             this.endbossBar.draw(this.ctx, this.endboss);
    //         }
    //     }

    //     this.addToMap(this.shark);
    //     this.addObjectsToMap(this.enemies);

    //     this.ctx.restore();
    //     if (this.gameState === "lose" || this.gameState === "win") {
    //         this.drawEndOverlay();
    //     }

    //     this.addToMap(this.statusBar);
    //     this.addToMap(this.poisonBar);
    //     this.addToMap(this.coinsBar);

    //     if (this.endboss.deadDone) {
    //         this.endboss.drawWinCentered(this.ctx);
    //     }
        
    //     requestAnimationFrame(() => this.draw());
    // }    

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.checkEndState();
        this.ctx.save();
        this.ctx.translate(this.x_camera, 0);
        this.drawWorld();
        this.ctx.restore();
        this.drawUI();
        requestAnimationFrame(() => this.draw());
    }

    drawWorld() {
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.poisons);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.poisonShots);
        this.addToMap(this.shark);
        this.addObjectsToMap(this.enemies);
        this.drawEndboss();
    }

    drawEndboss() {
        if (!this.endboss.visible || this.endboss.deadDone) return;

        this.addToMap(this.endboss);
        if (this.showEndbossBar) {
            this.endbossBar.draw(this.ctx, this.endboss);
        }
    }

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

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

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

    randomY() {
        return 100 + Math.random() * 400;
    }


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

    applyEnemyDamage(enemy) {
        if (enemy.dead) return false;

        if (enemy instanceof JellyFish) {
            this.shark.hitShock(800);
        }

        if (enemy instanceof PufferFish) {
            this.shark.hitPoison(1200);
        }

        if (this.shark.energy <= 0) {
            this.shark.energy = 0;
        }

        this.statusBar.setPercentage(this.shark.energy);
         return true;
    }

    cleanupDeadEnemies() {
        this.enemies = this.enemies.filter(e => !e.deadDone);
    }

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

    checkEnemyCollisions() {
        this.enemies.forEach((enemy) => {
            this.updatePufferNear(enemy);

            if (this.shark.isColliding(enemy, 40)) {
                if (this.trySlapKill(enemy)) return;
                const tookDamage = this.applyEnemyDamage(enemy);
                if (tookDamage) {
                    this.statusBar.setPercentage(this.shark.energy);
                    if (this.sounds) this.sounds.play("sharkHurt");
                }
            }
        });
    }

    checkEndbossCollisions() {
        if (!this.endboss.visible || this.endboss.dead) return;

        if (this.shark.slap && this.shark.isColliding(this.endboss, 70)) {
            this.endboss.hit();
            this.showEndbossBar = true;
            this.endbossBar.setPercentage(this.endboss.energy);
        }

        if (this.shark.isColliding(this.endboss, 70)) {
            this.shark.hitShock(800);
            this.statusBar.setPercentage(this.shark.energy);
            if (this.sounds) this.sounds.play("sharkHurt");
        }

        if (this.endboss.deadDone) this.showEndbossBar = false;
    }


    spawnPoison() {
        for (let i = 0; i < 30; i++) {
            const x = 300 + Math.random() * 2800;
            const y = this.randomY();
            this.poisons.push(new Poison(x, y));
        }
    }

    ckeckPoisons() {
        this.poisons.forEach((poison, index) => {
            if (this.poisonCount >= this.maxPoison) return;

            if (this.shark.isColliding(poison, 10)) {
                this.poisons.splice(index, 1);

                this.poisonCount++;
                if (this.sounds) { this.sounds.play("poison"); };
                const percent = (this.poisonCount / this.maxPoison) * 100;
                this.poisonBar.setPercentage(percent);
            }
        });
    }

    spawnCoins() {
        for (let i = 0; i < 20; i++) {
            const x = 300 + Math.random() * 2600;
            const y = this.randomY();
            this.coins.push(new Coin(x, y));
        }
    }

    checkCoins() {
        this.coins.forEach((coin, index) => {
            if (this.shark.isColliding(coin, 10)) {
                this.coins.splice(index, 1);

                this.coinCount++;
                const percent = (this.coinCount / this.maxCoins) * 100;
                this.coinsBar.setPercentage(percent);
                this.sounds.play("coin");
            }
        });
    }

    shootPoison() {
        if (!this.shark.shotReady) return;
        if (this.poisonCount <= 0) return;

        const x = this.shark.x + this.shark.width;
        const y = this.shark.y + this.shark.height / 2;

        this.poisonShots.push(new PoisonShot(x, y));

        this.poisonCount--;
        const percent = (this.poisonCount / this.maxPoison) * 100;
        this.poisonBar.setPercentage(percent);

        this.shark.shotReady = false;
    }

    cleanupShots() {
        this.poisonShots = this.poisonShots.filter(s => s.x < 4000);
    }

    checkPoisonShotHits() {
        this.poisonShots.forEach((shot, shotIndex) => {
            this.enemies.forEach((enemy) => {
                if (enemy.dead) return;
                if (shot.isColliding(enemy, 10)) {
                    if (typeof enemy.die === 'function') {
                        enemy.die();
                        shot.hit = true;
                    }
                }
            });
                if (this.endboss.visible && !this.endboss.dead && shot.isColliding(this.endboss, 30)) {
                    this.endboss.hit();
                    shot.hit = true;

                    this.showEndbossBar = true;
                    this.endbossBar.setPercentage(this.endboss.energy);

                }
        });

        this.poisonShots = this.poisonShots.filter(s => !s.hit);
    }


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

    drawRetryButton() {
        if (!this.retryImg.complete) return;

        const w = this.canvas.width * 0.22;
        const h = w * 0.45;

        const x = (this.canvas.width - w) / 2;
        const y = this.canvas.height * 0.75;

        this.retryBtn = { x, y, w, h };
        this.ctx.drawImage(this.retryImg, x, y, w, h);
    }

}