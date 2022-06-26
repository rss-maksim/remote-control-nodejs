import robot from 'robotjs';

import { getMousePosition } from './getMousePosition';

export const drawRectangle = (width: number, height: number) => {
    const position = getMousePosition();
    robot.mouseToggle('down');

    for (let i = 0; i <= width; i += 5) {
        robot.dragMouse(position.x + i, position.y);
        robot.setMouseDelay(30);
    }

    for (let i = 0; i <= height; i += 5) {
        robot.dragMouse(position.x + width, position.y + i);
        robot.setMouseDelay(30);
    }

    for (let i = 0; i <= width; i += 5) {
        robot.dragMouse(position.x + width - i, position.y + height);
        robot.setMouseDelay(30);
    }

    for (let i = 0; i <= height; i += 5) {
        robot.dragMouse(position.x, position.y + height - i);
        robot.setMouseDelay(30);
    }

    robot.mouseToggle('up');
};
