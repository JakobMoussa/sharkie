class World {
    shark = new Shark();
        enemies = [
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),
        new PufferFish(),

    ];

    backgroundObjects = [
        new Background('img/Grafiken - Sharkie/3. Background/Dark/1.png', 0, 0)
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
  if (mo.img && mo.img.complete) {
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}

    

}