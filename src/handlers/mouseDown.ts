import robot from 'robotjs';

import { getMousePosition } from './getMousePosition';
import {getScreenSize} from './getScreenSize';

export const mouseDown = (delta: number) => {
    const { x, y } = getMousePosition();
    const { height } = getScreenSize();
    robot.moveMouse(x, Math.min(y + delta, height));
}
