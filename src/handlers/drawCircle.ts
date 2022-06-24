import robot from 'robotjs';

import { getMousePosition } from './getMousePosition';

export const drawCircle = (radius: number) => {
    const position = getMousePosition();
    robot.mouseToggle('down');

    for (let i = 0; i <= Math.PI * 2 + 0.1; i += 0.01) {
        const x = position.x + (radius * Math.cos(i));
        const y = position.y + (radius * Math.sin(i));

        robot.dragMouse(x, y);
    }
    robot.mouseToggle('up');
};
