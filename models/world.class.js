class World {
    shark = new Shark();
        enemies = [
        new PufferFish(300, this.randomY(), 'green'),
        new PufferFish(500, this.randomY(), 'red'),
        new PufferFish(850, this.randomY(), 'green'),
        new PufferFish(450, this.randomY(), 'red'),
        new PufferFish(750, this.randomY(), 'green'),
    ];

    backgroundObjects = [
        new Background('img/Grafiken - Sharkie/3. Background/Dark/1.png', 0, 0),
        new Background('img/Grafiken - Sharkie/3. Background/Dark/2.png', 0, 0),
        new Background('img/Grafiken - Sharkie/3. Background/Dark/1.png', 0, 0),
        new Background('img/Grafiken - Sharkie/3. Background/Dark/2.png', 0, 0),
    ];

    canvas;
    ctx;
    img;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas
        this.draw();
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.shark);
        this.addObjectsToMap(this.enemies);

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        if (!mo.img) return;

        if (mo.img.complete && mo.img.naturalWidth > 0) {
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }
    }

    randomY() {
        return 100 + Math.random() * 400;
    }


}