import robot from 'robotjs';
import Jimp from 'jimp';

import { getMousePosition } from './getMousePosition';

const size = 200;
const half = Math.round(size / 2);

export const printScreen = async () => {
    const { x, y } = getMousePosition();
    const {width, height, image: data } = robot.screen.capture(x - half, y - half, size, size);
    const image = new Jimp({ data, width, height });
    const encodedImg = await image.getBase64Async(Jimp.MIME_PNG);
    const [, img] = encodedImg.split(',');
    return img;
}
