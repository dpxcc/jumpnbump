import { Level } from "./level";

function random(max) {
    return Math.floor(Math.random() * max);
}

export class Player {
    constructor(images, playerId, keys) {
        this.image = images.add("sprites/player.png");
        this.playerId = playerId;
        this.keys = keys;
        this.enabled = false;
    }

    spawn(level, players) {
        while (true) {
            const tileX = random(22);
            const tileY = random(16 - 1);
            if (level.getTile(tileX, tileY) != Level.Tile.VOID ||
                (level.getTile(tileX, tileY + 1) != Level.Tile.SOLID && level.getTile(tileX, tileY + 1) != Level.Tile.ICE)) {
                continue;
            }
            for (const player of players) {
                if (this != player && player.enabled) {
                    if (Math.abs((tileX << 4) - (player.x >> 16)) < 32 && Math.abs((tileY << 4) - (player.y >> 16)) < 32) {
                        continue;
                    }
                }
            }

            this.x = tileX << 20;
            this.y = tileY << 20;
            break;
        }
    }

    update(input) {
        const sx = this.x >> 16;
        const sy = this.y >> 16;
        const belowLeft = level.getTile(sx >> 4, (sy + 16) >> 4);
        const below = level.getTile((sx + 8) >> 4, (sy + 16) >> 4);
        const belowRight = level.getTile((sx + 15) >> 4, (sy + 16) >> 4);
        const isOnIce = below == Level.Tile.ICE || (belowLeft != Level.Tile.SOLID && belowRight == Level.Tile.ICE) || (belowLeft == Level.Tile.ICE && belowRight != Level.Tile.SOLID);

        if (input.isKeyPressed(this.keys[0])) {
            this.x--;
        }
        if (input.isKeyPressed(this.keys[1])) {
            this.x++;
        }
        if (input.isKeyPressed(this.keys[2])) {
            this.y--;
        }
    }

    render(renderer) {
        const sx = this.playerId == 0 ? 0 : 342;
        const sy = 0;
        renderer.drawImage(this.image, sx, sy, this.x >> 16, this.y >> 16, 13, 15);
    }
};
