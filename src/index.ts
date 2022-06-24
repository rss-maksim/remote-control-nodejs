import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';

import { Event } from './constants';
import { getMousePosition, mouseDown, mouseUp, mouseLeft, mouseRight, drawCircle, drawRectangle } from './handlers';

dotenv.config();

const port = Number(process.env.PORT) || 8080;

const socket = new WebSocketServer({ port }, () => {
    console.log(`Web socket is up on the port ${port}`);
});

socket.on('connection', (ws) => {
    ws.on('message', (data, b) => {
        const [event, value, height] = data.toString().split(' ');
        console.log('event', event, value);
        switch (event) {
            case Event.MOUSE_POSITION:
                const pos = getMousePosition();
                ws.send(`${Event.MOUSE_POSITION} {${pos.x}},{${pos.y}}`);
                break;
            case Event.MOUSE_UP:
                mouseUp(parseInt(value));
                break;
            case Event.MOUSE_DOWN:
                mouseDown(parseInt(value));
                break;
            case Event.MOUSE_LEFT:
                mouseLeft(parseInt(value));
                break;
            case Event.MOUSE_RIGHT:
                mouseRight(parseInt(value));
                break;
            case Event.DRAW_CIRCLE:
                drawCircle(parseInt(value));
                break;
            case Event.DRAW_RECTANGLE:
                drawRectangle(parseInt(value), parseInt(height));
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


