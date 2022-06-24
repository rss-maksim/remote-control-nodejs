import robot from 'robotjs';

import {Event} from "../constants";

export const mouseUp = (event: Event) => {
    const mouse = robot.getMousePos();
    console.log('event', event);
}
