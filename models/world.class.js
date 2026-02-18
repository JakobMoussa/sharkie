class World {
    shark = new Shark();
    enemies = Level1.enemies;
    backgroundObjects = Level1.backgroundObjects;

    canvas;
    ctx;
    img;
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
    shootCd = 0;


    endbossBar;
    showEndbossBar = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.endboss = new Endboss();
        this.endboss.world = this;
        this.endboss.endbossAnimation();

        this.setWorld();
        this.shark.start();
        this.statusBar = new StatusBar();
        this.poisonBar = new PoisonBar();
        this.coinsBar = new CoinsBar();
        this.endbossBar = new EndbossStatusBar();
        this.checkCollisions();
        this.spawnPoison();
        this.spawnCoins();
        this.draw();
    }

    setWorld() {
        this.shark.world = this;
    }
 
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();

        this.ctx.translate(this.x_camera, 0);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.poisons);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.poisonShots);

        if (this.endboss.visible && !this.endboss.deadDone) {
            this.addToMap(this.endboss);

            if (this.showEndbossBar) {
                this.endbossBar.draw(this.ctx, this.endboss);
            }
        }

        this.addToMap(this.shark);
        this.addObjectsToMap(this.enemies);

        this.ctx.restore();

        this.addToMap(this.statusBar);
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinsBar);
        
        requestAnimationFrame(() => this.draw());
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
        if (enemy.dead) return;

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
    }

    cleanupDeadEnemies() {
        this.enemies = this.enemies.filter(e => !e.deadDone);
    }

    checkCollisions() {
        setInterval(() => {

            this.enemies.forEach((enemy) => {
                this.updatePufferNear(enemy);

                if (this.shark.isColliding(enemy, 40)) {
                    if (this.trySlapKill(enemy)) return;
                    this.applyEnemyDamage(enemy);
                    if (
                        this.endboss.visible &&
                        !this.endboss.dead &&
                        this.shark.slap &&
                        this.shark.isColliding(this.endboss, 20)
                    )       {
                this.endboss.hit();

                this.showEndbossBar = true;
                this.endbossBar.setPercentage(this.endboss.energy);
            }
                }
                if (this.shark.isColliding(this.endboss, 20) && !this.endboss.dead) {
                    this.shark.hitShock(800);
                    this.statusBar.setPercentage(this.shark.energy);
                }
            });

            if (this.endboss.deadDone) {
                this.showEndbossBar = false;
            }

            this.checkCoins();
            this.ckeckPoisons();
            this.checkPoisonShotHits();
            this.cleanupDeadEnemies();

            this.shootPoison();
            this.cleanupShots();

        }, 100 / 60);
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

    die() {
        this.dead = true;
        this.deadDone = false;
        this.currentImage = 0;
    }


}