class MovableObject extends DrawableObject {
    
    speed = 0.15;
    otherDirection = false;
    offset = 10;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
    arr.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
    });
    }

    moveLeft () {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

    playAnimation(images) {
        if (!images || images.length === 0) return;

        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    fishAnimation(images) {
        if (!images || images.length === 0) return;

        this.currentImage = (this.currentImage + 1) % images.length;
        const path = images[this.currentImage];
        this.img = this.imageCache[path] || this.img;
    }

    isColliding(other, offset) {
        return (
            this.x + this.width - offset > other.x + offset &&
            this.x + offset < other.x + other.width - offset &&
            this.y + this.height - offset > other.y + offset &&
            this.y + offset < other.y + other.height - offset
        );
    }

    
}


