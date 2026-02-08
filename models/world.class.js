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
    poisons = [];
    statusBar;
    poisonBar;
    coinsBar;
    coins = [];

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
        
        this.ctx.translate(this.x_camera, 0);
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.poisons);
        this.addObjectsToMap(this.coins);
        this.addToMap(this.endboss);
        this.addToMap(this.shark);
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.x_camera, 0);

        this.addToMap(this.statusBar);
        this.addToMap(this.poisonBar);
        this.addToMap(this.coinsBar);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        // if (!mo.img || !mo.img.complete || mo.img.naturalWidth === 0) return;
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
    }

    cleanupDeadEnemies() {
        this.enemies = this.enemies.filter(e => !e.deadDone);
    }

    checkCollisions() {
        setInterval(() => {

            this.enemies.forEach((enemy) => {
                this.updatePufferNear(enemy);

                if (this.shark.isColliding(enemy, 15)) {
                    if (this.trySlapKill(enemy)) return;
                    this.applyEnemyDamage(enemy);
                }
            });

            this.cleanupDeadEnemies();

        }, 100 / 60);
    }

    spawnPoison() {
    for (let i = 0; i < 30; i++) {
        const x = 300 + Math.random() * 2800;
        const y = this.randomY();
        this.poisons.push(new Poison(x, y));
    }
    }

    spawnCoins() {
    for (let i = 0; i < 20; i++) {
        const x = 300 + Math.random() * 2600;
        const y = this.randomY();
        this.coins.push(new Coin(x, y));
    }
}

}