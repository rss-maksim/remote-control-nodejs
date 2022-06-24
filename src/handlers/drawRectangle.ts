import robot from 'robotjs';

import { getMousePosition } from './getMousePosition';

export const drawRectangle = (width: number, height: number) => {
    const position = getMousePosition();
    robot.mouseToggle('down');

    drawSide(width, position);

    // for (let i = 0; i <= width; i += 5) {
    //     robot.dragMouse(position.x + i, position.y);
    //     robot.setMouseDelay(10);
    // }

    drawSide(height, { x: position.x + width, y: position.y });

    // for (let i = 0; i <= height; i += 5) {
    //     robot.dragMouse(position.x + width, position.y + i);
    //     robot.setMouseDelay(10);
    // }

    drawSide(width, { x: position.x + width, y: position.y });

    for (let i = 0; i <= height; i += 5) {
        robot.dragMouse(position.x, position.y + i);
        robot.setMouseDelay(10);
    }

    for (let i = height; i >= 0; i -= 5) {
        robot.dragMouse(position.x, position.y - i);
        robot.setMouseDelay(10);
    }

    robot.mouseToggle('up');
};

function drawSide(size: number, initialPosition: { x: number; y: number; }, step = 5) {
    for (let i = 0; i <= size; i += step) {
        robot.dragMouse(initialPosition.x + i, initialPosition.y);
        robot.setMouseDelay(10);
    }
}
