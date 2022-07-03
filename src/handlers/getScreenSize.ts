import robot from 'robotjs';

export const getScreenSize = (): { width: number, height: number } => {
    return robot.getScreenSize();
}
