import robot from 'robotjs';

import { getMousePosition } from './getMousePosition';

export const mouseUp = (delta: number) => {
    const { x, y } = getMousePosition();
    robot.moveMouse(x, Math.max(y - delta, 0));
}
