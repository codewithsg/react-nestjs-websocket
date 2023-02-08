import './App.css';
import { WebSocket } from './components/WebSocket';
import {socket, WebSocketProvider } from './contexts/WebsocketContext';

function App() {
  return (
    <WebSocketProvider value={socket}>
      <WebSocket />
    </WebSocketProvider>
  );
}

export default App;
