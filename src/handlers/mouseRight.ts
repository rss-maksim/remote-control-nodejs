import robot from 'robotjs';

import { getMousePosition } from './getMousePosition';
import {getScreenSize} from './getScreenSize';

export const mouseRight = (delta: number) => {
    const { x, y } = getMousePosition();
    const { width } = getScreenSize();
    robot.moveMouse(Math.min(x + delta, width), y);
}
