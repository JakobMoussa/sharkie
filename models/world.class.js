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

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.endboss = new Endboss();
        this.endboss.world = this;
        this.endboss.endbossAnimation();

        this.setWorld();
        this.shark.start();
        this.checkCollisions();
        this.draw();
    }

    setWorld() {
        this.shark.world = this;
    }
 
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.x_camera, 0);
        
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.endboss);
        this.addToMap(this.shark);
        this.addObjectsToMap(this.enemies);

        this.ctx.translate(-this.x_camera, 0);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        if (!mo.img || !mo.img.complete || mo.img.naturalWidth === 0) return;

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

    checkCollisions() {
        setInterval(() => {
            this.enemies.forEach((enemy, index) => {
                if (this.shark.isColliding(enemy, 15)) {
                    if (this.shark.slap) {
                        this.enemies.splice(index, 1);
                        return;
                    }
                    
                    if (enemy instanceof JellyFish) this.shark.hitShock(800);
                    if (enemy instanceof PufferFish) this.shark.hitPoison(1200);
                }
            });
            if (this.endboss?.hasAppeared && this.shark.isColliding(this.endboss, 20)) {
                console.log("Treffer mit Endboss");
            }
        }, 100 / 60);
    }

}