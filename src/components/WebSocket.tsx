import { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "../contexts/WebsocketContext"


type MessagePayload = {
    content: string;
    message: string;
}

export const WebSocket = () => {
    const [value, setValue] = useState('');
    const [messages, setMessages] = useState<MessagePayload[]>([]);
    const socket = useContext(WebSocketContext);

    useEffect(() => {
        socket.on('connect', () => {
            console.log('connected to socket');
        })
        socket.on('onMessage', (data: MessagePayload) => {
            console.log('onMessage event received:', data);
            setMessages((prev) => [...prev, data])
        });
        return () => {
            console.log('unregistering Events....')
            socket.off('connect');
            socket.off('onMessage');
        }
    }, []);

    const onSubmit = () => {
        socket.emit('newMessage', value);
        setValue('');
    }

    return (
        <div>
            <div>
                <h1>WebSocket Component</h1>
                <div>{messages.length ===0 ? <div>No messages available</div> : <div>{messages.map((msg)=><div>
                    <p>{msg.content}</p>
                </div>)}</div>}</div>
                <div>
                    <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
                    <button onClick={onSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}