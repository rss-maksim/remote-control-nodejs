import { WebSocketServer, createWebSocketStream } from 'ws';
import dotenv from 'dotenv';

import { Event } from './constants';
import { getMousePosition, mouseDown, mouseUp, mouseLeft, mouseRight, drawCircle, drawRectangle, printScreen } from './handlers';

dotenv.config();

const port = Number(process.env.PORT) || 8080;

const socket = new WebSocketServer({ port }, () => {
    console.log(`Web socket is up on the port ${port}`);
});

socket.on('connection', (ws) => {
    const socketStream = createWebSocketStream(ws, { decodeStrings: false });

    ws.on('message', async (data, b) => {
        console.log('Command: %s', data);

        try {
            const [event, widthValue, widthHeight] = data.toString().split(' ');
            const width = parseInt(widthValue, 10);
            const height = parseInt(widthHeight, 10);
            switch (event) {
                case Event.MOUSE_POSITION:
                    const pos = getMousePosition();
                    socketStream.write(`${Event.MOUSE_POSITION} {${pos.x}},{${pos.y}} \0`);
                    console.log(`Mouse position is sent \n`);
                    break;
                case Event.MOUSE_UP:
                    mouseUp(width);
                    console.log(`Mouse is moved up \n`);
                    break;
                case Event.MOUSE_DOWN:
                    mouseDown(width);
                    console.log(`Mouse is moved down \n`);
                    break;
                case Event.MOUSE_LEFT:
                    mouseLeft(width);
                    console.log(`Mouse is moved left \n`);
                    break;
                case Event.MOUSE_RIGHT:
                    mouseRight(width);
                    console.log(`Mouse is moved right \n`);
                    break;
                case Event.DRAW_CIRCLE:
                    drawCircle(width);
                    console.log(`Circle is drawn \n`);
                    break;
                case Event.DRAW_RECTANGLE:
                    drawRectangle(width, height);
                    console.log(`Rectangle is drawn \n`);
                    break;
                case Event.DRAW_SQUARE:
                    drawRectangle(width, width);
                    console.log(`Square is drawn \n`);
                    break;
                case Event.PRNT_SCRN:
                    const image = await printScreen();
                    socketStream.write(`${Event.PRNT_SCRN} ${image} \0`);
                    console.log(`Screenshot is made and image is sent to the client \n`);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error(error);
        }
    });
});

socket.on('close', () => {
    console.log('Websocket disconnected');
});


