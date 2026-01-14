class Background extends MovableObject {

    height = 600;
    width = 900
    
    constructor(imagePath, x, y) {
        super()
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}