import robot from 'robotjs';

export const getMousePosition = (): { x: number, y: number } => {
    return robot.getMousePos();
}
