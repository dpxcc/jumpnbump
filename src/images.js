export class Images {
    constructor()
    {
        this.images = {};
    }

    add(src) {
        if (!(src in this.images)) {
            this.images[src] = new Image();
            this.images[src].src = src;
        }
        return this.images[src];
    }
};
