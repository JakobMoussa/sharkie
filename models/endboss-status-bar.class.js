class EndbossStatusBar {

    constructor() {
        this.width = 140;
        this.height = 14;
        this.percentage = 100;
    }

    /**
     * Clamps and stores the boss health percentage.
     * @param {number} value - Health value between 0 and 100.
     */
    setPercentage(value) {
        this.percentage = Math.max(0, Math.min(100, value));
    }

    /**
     * Draws the status bar above the boss.
     * @param {CanvasRenderingContext2D} ctx - Rendering context.
     * @param {{x:number, y:number, width:number}} boss - Boss dimensions and position.
     */
    draw(ctx, boss) {
        const x = boss.x + boss.width / 2 - this.width / 2;
        const y = boss.y - this.height - 1;
        const fillW = this.width * (this.percentage / 100);

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.roundRect(x - 2, y - 2, this.width + 4, this.height + 4, 6);
        ctx.fill();

        ctx.fillStyle = "gray";
        ctx.beginPath();
        ctx.roundRect(x, y, this.width, this.height, 6);
        ctx.fill();

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.roundRect(x, y, fillW, this.height, 6);
        ctx.fill();
    }
}
