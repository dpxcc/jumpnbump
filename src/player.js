import { Level } from "./level";

function random(max) {
    return Math.floor(Math.random() * max);
}

export class Player {
    constructor(images, playerId, keys) {
        this.image = images.add("sprites/player.png");
        this.playerId = playerId;
        this.keys = keys;
        this.isEnabled = false;
        this.vx = 0;
        this.vy = 0;
    }

    spawn(level, players) {
        while (true) {
            const tileX = random(22);
            const tileY = random(16 - 1);
            if (
                level.getTile(tileX, tileY) != Level.Tile.VOID ||
                (level.getTile(tileX, tileY + 1) != Level.Tile.SOLID &&
                    level.getTile(tileX, tileY + 1) != Level.Tile.ICE)
            ) {
                continue;
            }

            let success = true;
            for (const player of players) {
                if (player.isEnabled) {
                    if (
                        Math.abs((tileX << 4) - (player.x >> 16)) < 32 &&
                        Math.abs((tileY << 4) - (player.y >> 16)) < 32
                    ) {
                        success = false;
                    }
                }
            }
            if (!success) {
                continue;
            }

            this.x = tileX << 20;
            this.y = tileY << 20;
            this.isEnabled = true;
            break;
        }
    }

    getTileBelow(level) {
        const sx = this.x >> 16;
        const sy = this.y >> 16;
        if (level.isBlock((sx + 8) >> 4, (sy + 16) >> 4)) {
            return level.getTile((sx + 8) >> 4, (sy + 16) >> 4);
        }
        if (level.isBlock(sx >> 4, (sy + 16) >> 4)) {
            return level.getTile(sx >> 4, (sy + 16) >> 4);
        }
        if (level.isBlock((sx + 16) >> 4, (sy + 16) >> 4)) {
            return level.getTile((sx + 16) >> 4, (sy + 16) >> 4);
        }
        return level.getTile((sx + 8) >> 4, (sy + 16) >> 4);
    }

    update(level, input) {
        const tileBelow = this.getTileBelow(level);
        const acceleration = tileBelow == Level.Tile.ICE ? 1 : 8;
        if (input.isKeyPressed(this.keys[0]) && !input.isKeyPressed(this.keys[1])) {
            if (this.vx > 0) {
                this.vx -= acceleration * 0x400;
                // TODO: smoke
            } else {
                this.vx -= acceleration * 0x300;
            }
            this.vx = Math.max(this.vx, -0x18000);
        } else if (!input.isKeyPressed(this.keys[0]) && input.isKeyPressed(this.keys[1])) {
            if (this.vx < 0) {
                this.vx += acceleration * 0x400;
                // TODO: smoke
            } else {
                this.vx += acceleration * 0x300;
            }
            this.vx = Math.min(this.vx, 0x18000);
        } else {
            if (tileBelow == Level.Tile.SOLID || tileBelow == Level.Tile.SPRING) {
                if (this.vx < 0) {
                    this.vx = Math.min(this.vx + 0x4000, 0);
                } else {
                    this.vx = Math.max(this.vx - 0x4000, 0);
                }
            }
        }

        this.x += this.vx;
        if (this.x >> 16 < 0) {
            this.x = 0;
            this.vx = 0;
        } else if ((this.x >> 16) + 15 > 351) {
            this.x = 336 << 16;
            this.vx = 0;
        }

        let sx = this.x >> 16;
        let sy = this.y >> 16;
        if (level.isBlock(sx >> 4, sy >> 4) || level.isBlock(sx >> 4, (sy + 15) >> 4)) {
            this.x = ((sx >> 4) + 1) << 20;
            this.vx = 0;
        }
        sx = this.x >> 16;
        if (level.isBlock((sx + 15) >> 4, sy >> 4) || level.isBlock((sx + 15) >> 4, (sy + 15) >> 4)) {
            this.x = (((sx + 15) >> 4) - 1) << 20;
            this.vx = 0;
        }
    }

    render(renderer) {
        const sx = this.playerId == 0 ? 0 : 342;
        const sy = 0;
        renderer.drawImage(this.image, sx, sy, (this.x >> 16) + 2, (this.y >> 16) + 1, 13, 15);
        renderer.rect(this.x >> 16, this.y >> 16, 16, 16);
    }
}
