import { io } from "socket.io-client";
import { serverUrl } from "./config";

let socket = null;

export const connectSocket = (userId) => {
  if (!socket && userId) {
    socket = io(`${serverUrl}`, {
      query: { userId },
      withCredentials: true,
    });
  }
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
