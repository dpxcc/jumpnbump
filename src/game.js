import { Key } from './key';
import { Player } from './player';

const width = 400;
const height = 256;

export class Game {
    constructor(images, input, renderer, level) {
        this.input = input;
        this.renderer = renderer;
        this.level = level;

        const rng = 0;
        this.players = [
            new Player(images, 0, [Key.ARROW_LEFT, Key.ARROW_RIGHT, Key.ARROW_UP]),
            new Player(images, 1, [Key.A, Key.D, Key.W]),
            new Player(images, 2, [Key.V, Key.N, Key.G]),
            new Player(images, 3, [Key.J, Key.L, Key.I])
        ];
        for (const player of this.players) {
            player.spawn(level, this.players);
        }
    }

    update() {
        // game logic

        // physics engine
        // positional logic
        // collision detection
        // collision resolution

        for (const player of this.players) {
            player.update(this.input);
        }

        // for (let i = 0; i < this.players.length - 1; i++) {
        //     const lhs = this.players[i];
        //     for (let j = i + 1; j < this.players.length; j++) {
        //         const rhs = this.players[j];
        //         if (Math.abs(lhs.x - rhs.x) < 0xC0000 && Math.abs(lhs.y - rhs.y) < 0xC0000) {
        //             if (Math.abs(lhs.y - rhs.y) > 0x50000) {
        //                 if (lhs.y > rhs.y) {
        //                     [lhs, rhs] = [rhs, lhs];
        //                 }
        //                 rhs.die;
        //             }
        //             else {
        //                 alert("repel");
        //             }
        //         }
        //     }
        // }
    }

    render() {
        this.renderer.resize(width, height);
        this.renderer.drawImage(this.level.background, 0, 0, 0, 0, width, height);
        for (const player of this.players) {
            player.render(this.renderer);
        }
        this.renderer.drawImage(this.level.foreground, 0, 0, 0, 0, width, height);
    }

    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
};
