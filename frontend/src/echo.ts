import axios from "axios";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const REVERB_HOST = import.meta.env.VITE_REVERB_HOST ?? "localhost";
const REVERB_PORT = Number(import.meta.env.VITE_REVERB_PORT ?? 443);
const REVERB_SCHEME = import.meta.env.VITE_REVERB_SCHEME ?? "https";
const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";
const REVERB_APP_KEY = import.meta.env.VITE_REVERB_APP_KEY ?? "your-app-key";

declare global {
  interface Window {
    Pusher: typeof Pusher;
  }
}

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "reverb",
  key: REVERB_APP_KEY,
  wsHost: REVERB_HOST,
  wsPort: REVERB_PORT,
  wssPort: REVERB_PORT,
  forceTLS: REVERB_SCHEME === "https",
  enabledTransports: ["ws", "wss"],
  authorizer: (channel) => ({
    authorize: (socketId: string, callback: Function) => {
      const token = localStorage.getItem("authToken");
      axios
        .post(`${API_URL}/broadcasting/auth`, {
          socket_id: socketId,
          channel_name: channel.name,
        }, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        .then((response) => callback(false, response.data))
        .catch((error) => callback(true, error));
    },
  }),
});

export default echo;
