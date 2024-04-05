export class Level
{
    static WIDTH = 22;
    static HEIGHT = 16;
    static Tile = {
        VOID: 0,
        SOLID: 1,
        WATER: 2,
        ICE: 3,
        SPRING: 4
    };

    constructor(images) {
        this.background = images.add("levels/default/background.png");
        this.foreground = images.add("levels/default/foreground.png");
        this.tiles = this.parseTiles([
            "1110000000000000000000",
            "1000000000001000011000",
            "1000111100001100000000",
            "1000000000011110000011",
            "1100000000111000000001",
            "1110001111110000000001",
            "1000000000000011110001",
            "1000000000000000000011",
            "1110011100000000000111",
            "1000000000003100000001",
            "1000000000031110000001",
            "1011110000311111111001",
            "1000000000000000000001",
            "1100000000000000000011",
            "2222222214000001333111",
            "1111111111111111111111"
        ]);
    }

    parseTiles(tiles) {
        return tiles.map(row => [...row].map(tile => parseInt(tile)));
    }

    getTile(tileX, tileY) {
        return this.tiles[tileY][tileX];
    }
};
