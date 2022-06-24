import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import {Event} from "./constants";
import {mouseUp} from "./handlers/mouseUp";
import {getMousePosition} from "./handlers";

dotenv.config();

const port = Number(process.env.PORT) || 8080;

const socket = new WebSocketServer({ port });

socket.on('connection', (ws) => {
    ws.on('message', (data, b) => {
        const event = data.toString() as Event;
        switch (event) {
            case Event.MOUSE_POSITION:
                const pos = getMousePosition();
                ws.send(`${Event.MOUSE_POSITION} {${pos.x}},{${pos.y}}`);
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


