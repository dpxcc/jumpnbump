import { Game } from './game';
import { Images } from './images';
import { Input } from './input';
import { Level } from './level';
import { Renderer } from './renderer';

const canvas = document.getElementById("canvas");
const images = new Images();
const input = new Input();
document.onkeydown = event => input.onKeyDown(event);
document.onkeyup = event => input.onKeyUp(event);
const renderer = new Renderer(canvas);
const level = new Level(images);
const game = new Game(images, input, renderer, level);
game.gameLoop();
