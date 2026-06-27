import {createdCard, deleteCard, getAllCards, isValidStatus, updateCard} from '../services/cardService.js'
import {serializeCard} from '../utils/serializeCard.js'

const getOriginClientId = (req)=>req.headers['x-client-id'] || null


export const getCards = async(req,res)=>{
    try {
        const cards = await getAllCards()
        res.json(cards.map(serializeCard))
        
    } catch (error) {
        res.status(500).json({message:'failed to fetch',error:error.message})
        
    }
}

export const createCardHandler = async(req,res)=>{
    try {
        const {title,status='todo'} = req.body;

        if(!title?.trim()){
            return res.status(400).json({message:'title is required'})
        }
        if(!isValidStatus(status)){
            return res.status(400).json({message:'invalid status'})
        }

        const card = await createdCard({title:title.trim(),status})
        const serialized = serializeCard(card)

        req.io.emit('card:created',{
            card:serialized,
            originClientId:getOriginClientId(req)
        })
        
        res.status(201).json(serialized)
        
    } catch (error) {
        res.status(500).json({message:'failed to create card',error:error.message})
        
    }
}


export const updateCardHandler = async(req,res)=>{
    try {
        const {id} = req.params;
        const {title,status,position} = req.body;

        if(status !==undefined && !isValidStatus(status)){
            return res.status(400).json({message:'Invalid status'})
        }

        if(title !==undefined && !title?.trim()){
            return res.status(400).json({message:'title is required'})
        }

        const card = await updateCard(id,{title,status,position})
        if(!card){
            return res.status(404).json({message:'card not found'})
        }

        const serialized = serializeCard(card)

        req.io.emit('card:updated',{
            card:serialized,
            originClientId:getOriginClientId(req)
        })

        res.json(serialized)
        
    } catch (error) {
        if(error.name ==='CastError'){
            return res.status(400).json({messag:'invalid card id'})
        }
        res.status(500).json({message:'failed to update card',error:error.message})
    }
}

export const deleteCardHanlder = async(req,res)=>{
    try {
        const {id} = req.params;
        const card = await deleteCard(id)
        
        if(!card){
            return res.status(404).json({message:'card not found'})
        }

        req.io.emit('card:deleted',{
            id,
            originClientId:getOriginClientId(req)
        })

        res.json({id})

    } catch (error) {
        res.status(500).json({message:'failed to delete card',error:error.message})
    }
}