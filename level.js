import { canvas, ctx, tileSize, levelHeight, levelWidth, level, spriteSheet } from "./main.js";
import { exitLocation } from "./tile.js";
import { drawCoordinates, coordsToggle } from "./page.js";

export function renderWalls()
{
    for (let x = 0; x < levelWidth; x++) {
        for (let y = 0; y < levelHeight; y++) {
            const xCoord = x * tileSize;
            const yCoord = y * tileSize;
            // Hard tiles
            if (level[x][y].type === "HardWall") {
                ctx.drawImage(spriteSheet, 0, 0, tileSize, tileSize, xCoord, yCoord, tileSize, tileSize);
            }
            // Soft tiles
            else if (level[x][y].type === "SoftWall") {
                ctx.drawImage(spriteSheet, tileSize, 0, tileSize, tileSize, xCoord, yCoord, tileSize, tileSize);
            }
        }
    }

    drawCoordinates(coordsToggle);
}

export function renderFloor()
{
    ctx.fillStyle = "#4192c3";
    ctx.fillRect(0, 0, levelWidth*tileSize, levelHeight*tileSize);

    // Yksi kerrallaan:
    // for (let x = 0; x < levelWidth; x++) {
    //     for (let y = 0; y < levelHeight; y++) {
    //         const xCoord = x * tileSize;
    //         const yCoord = y * tileSize;

    //         if (level[x][y].type === "Floor") {
    //             ctx.fillStyle = "#4192c3";
    //             ctx.fillRect(xCoord, yCoord, tileSize, tileSize);
    //         }
    //     }
    // }
}

export function renderExit()
{
    if (exitLocation.isOpen)
    {
        ctx.drawImage(spriteSheet, tileSize, tileSize*5, tileSize, tileSize, exitLocation.x, exitLocation.y, tileSize, tileSize);
    }
    else {
        ctx.drawImage(spriteSheet, 0, tileSize*5, tileSize, tileSize, exitLocation.x, exitLocation.y, tileSize, tileSize);
    }
}