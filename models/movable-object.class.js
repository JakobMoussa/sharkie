class MovableObject {
    x = 0;
    y = 200;
    img;
    imageCache = {};
    height = 250;
    width = 250;
    speed = 0.15;
    otherDirection = false;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
    arr.forEach((path) => {
        let img = new Image();
        img.onerror = () => console.error("Bild nicht gefunden:", path);
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


    
}


