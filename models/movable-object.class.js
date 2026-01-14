class MovableObject {
x = 0;
y = 200;
img;
imageCache = {};
height = 250;
width = 250;
speed = 0.15;

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

}


