import { WS_URL } from "@/lib/constants";
import { io } from "socket.io-client";

let socket;

export const getSocket = ()=>{
    if(!socket){
        socket = io(WS_URL,{
            autoConnect:false,
            transports:['websocket','polling']
        })
    }
    return socket
}