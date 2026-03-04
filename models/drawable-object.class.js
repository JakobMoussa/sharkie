class DrawableObject {

    x = 0;
    y = 200;
    height = 250;
    width = 250;
    img;
    imageCache = {};

    /**
     * Loads a single image into `img`.
     * @param {string} path - Relative or absolute image source.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Preloads multiple images into `imageCache`, keyed by path.
     * @param {string[]} arr - List of image source paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            const img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}
