export class Renderer {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.scale = undefined;
    }

    resize(width, height) {
        const scale = Math.min(window.innerWidth / width, window.innerHeight / height);
        if (this.scale != scale) {
            this.scale = scale;
            this.canvas.width = width * scale;
            this.canvas.height = height * scale;
            this.ctx.scale(scale, scale);
            this.ctx.imageSmoothingEnabled = false;
        }
    }

    drawImage(image, sx, sy, dx, dy, w, h) {
        this.ctx.drawImage(image, sx, sy, w, h, dx, dy, w, h);
    }

    rect(x, y, w, h) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = "red";
        this.ctx.rect(x, y, w, h);
        this.ctx.stroke();
    }
}
