import io from "socket.io-client";

// console.log("tokenInfo", tokenInfo);
const socket = io("http://localhost:3001");

export default socket;
