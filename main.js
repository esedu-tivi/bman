////////////////////
// Imports
import { renderWalls, renderFloor, EntranceAnimation, ExitAnimation } from "./level.js";
import { LevelHeaderAnimation, GameOverAnimation } from "./ui_animations.js";
import { renderPowerups } from "./powerup.js";
import { renderPlayer } from "./player.js";
import { renderEnemies } from "./enemy.js";
import { renderBombs, renderExplosions } from "./bomb.js";
import { Game, fetchLevels } from "./gamestate.js";
import { updateCamera } from "./camera.js";
import { showMainMenu } from "./page.js";

////////////////////
// Globals
export let canvas;
export let ctx;
export let game = new Game();
export let level = [];
let globalPause = true;
// Tarttee setterin koska JS..
export function setGlobalPause(value) {
    globalPause = value;
}

////////////////////
// Settings
export const tileSize = 64;
export const softTilePercent = 0.3;
export const powerUpCount = 1;
export const cagePlayer = true;
export const cageMultiplayer = false;

////////////////////
// Assets
export let spriteSheet = document.getElementById("sprite-sheet");

////////////////////
// Render
let lastTimeStamp = 0;
export let deltaTime = 16.6; // ~60fps alkuun..
export const scale = 1;

export const levelHeader = new LevelHeaderAnimation();
export const gameOverText = new GameOverAnimation();
export const entrance = new EntranceAnimation();
export const exit = new ExitAnimation();

function Render(timeStamp)
{
    deltaTime = (timeStamp - lastTimeStamp) / 1000;
    ctx.save();

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.restore();

    if(!globalPause) {

        updateCamera();
        renderFloor();
        renderPowerups();
        entrance.render();
        renderPlayer(timeStamp);
        renderWalls();
        exit.render();
        renderEnemies(timeStamp);
        renderBombs();
        renderExplosions();
        levelHeader.render();
        gameOverText.render();
    }

    lastTimeStamp = timeStamp

    requestAnimationFrame(Render);
}

////////////////////
// DOM
document.addEventListener("DOMContentLoaded", function ()
{
    canvas = document.getElementById("canvas");
    if (canvas) {
        ctx = canvas.getContext("2d");
        if (ctx) {
                fetchLevels();
                //game.newGame();
                Render();
        } else {
            throw new Error("Could not find ctx object.");
        }
    } else {
        throw new Error("Could not find canvas object.");
    }
});

