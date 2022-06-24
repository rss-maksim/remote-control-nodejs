import robot from 'robotjs';

import { getMousePosition } from './getMousePosition';

export const mouseLeft = (delta: number) => {
    const { x, y } = getMousePosition();
    robot.moveMouse(Math.max(x - delta, 0), y);
}
