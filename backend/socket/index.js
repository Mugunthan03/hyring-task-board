import { getAllCards } from "../services/cardService.js";
import { serializeCard } from "../utils/serializeCard.js";

export const initSocket = (io)=>{
    let onlineCount = 0;

    const emitPresence = ()=>{
        io.emit('presence:update',{count:onlineCount})
    }

    io.on('connection',async(socket)=>{
        onlineCount +=1
        emitPresence()

        try {
            const cards = await getAllCards()
            socket.emit('board:sync',{
                cards:cards.map(serializeCard)
            })
            
        } catch (error) {
            console.error('board:sync failed',error.message)
        }

        socket.on('disconnect',()=>{
            onlineCount = Math.max(0,onlineCount -1)
            emitPresence()
        })


    })
}