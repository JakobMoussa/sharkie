class World {
    shark = new Shark();
    enemeys = [
    new PufferFish(),
    new PufferFish(),
    new PufferFish(),
    new PufferFish(),

];
ctx;

constructor() {
    this.ctx = canvas.getContext('2d');
    this.draw();
}

draw(){
    this.ctx.drawImage(this.shark.img, this.shark.x, this.shark.y, this.shark.width, this.shark.height)
    let self = this;
    requestAnimationFrame(function() {
        self.draw();
    })
}

}