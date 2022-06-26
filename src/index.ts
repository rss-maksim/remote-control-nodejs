import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';

import { Event } from './constants';
import { getMousePosition, mouseDown, mouseUp, mouseLeft, mouseRight, drawCircle, drawRectangle, printScreen } from './handlers';

dotenv.config();

const port = Number(process.env.PORT) || 8080;

const socket = new WebSocketServer({ port }, () => {
    console.log(`Web socket is up on the port ${port}`);
});

socket.on('connection', (ws) => {
    ws.on('message', (data, b) => {
        const [event, widthValue, widthHeight] = data.toString().split(' ');
        const width = parseInt(widthValue, 10);
        const height = parseInt(widthHeight, 10);
        switch (event) {
            case Event.MOUSE_POSITION:
                const pos = getMousePosition();
                ws.send(`${Event.MOUSE_POSITION} {${pos.x}},{${pos.y}}`);
                break;
            case Event.MOUSE_UP:
                mouseUp(width);
                break;
            case Event.MOUSE_DOWN:
                mouseDown(width);
                break;
            case Event.MOUSE_LEFT:
                mouseLeft(width);
                break;
            case Event.MOUSE_RIGHT:
                mouseRight(width);
                break;
            case Event.DRAW_CIRCLE:
                drawCircle(width);
                break;
            case Event.DRAW_RECTANGLE:
                drawRectangle(width, height);
                break;
            case Event.DRAW_SQUARE:
                drawRectangle(width, width);
                break;
            case Event.PRNT_SCRN:
                printScreen();
                break;
            default:
                break;
        }
        console.log('received: %s', data);
    });
});

socket.on('close', () => {
    console.log('disconnected');
});


