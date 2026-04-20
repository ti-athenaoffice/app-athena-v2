import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import axios from 'axios'

const REVERB_PORT = import.meta.env.VITE_REVERB_PORT ?? 8080;
const REVERB_HOST = import.meta.env.VITE_REVERB_HOST ?? "http://localhost:8080";
const API_URL  = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

declare global {
  interface Window {
    Pusher: typeof Pusher
  }
}

window.Pusher = Pusher
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

const echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: REVERB_HOST,
  wsPort: REVERB_PORT,
  wssPort: REVERB_PORT,
  forceTLS: false,
  enabledTransports: ['ws', 'wss'],
  authorizer: (channel) => ({
    authorize: (socketId: string, callback: Function) => {
      axios.post(`${API_URL}/broadcasting/auth`, {
        socket_id: socketId,
        channel_name: channel.name,
      })
      .then(res => callback(false, res.data))
      .catch(err => callback(true, err))
    }
  })
})

export default echo;
