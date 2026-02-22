/**
 * Represents a static background image in the game.
 * 
 * The Background class extends {@link MovableObject} and is used
 * to render large background layers in the world.
 * 
 */
class Background extends MovableObject {

    height = 600;
    width = 900;
    

    constructor(imagePath, x, y) {
        super();
        this.loadImage(imagePath);
        this.x = x;
        this.y = y;
    }
}