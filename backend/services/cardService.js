import { Card } from "../models/Card.js"

const VALID_STATUSES = ['todo','in_progress','done']

export const isValidStatus = (status)=>VALID_STATUSES.includes(status)

const getNextPosition = async(status)=>{
    const lastCard = await Card.findOne({status}).sort({position:-1}).select('position').lean()

    return lastCard ? lastCard.position+1 : 0
}

export const getAllCards = async()=>{
    return Card.find().sort({status:1,position:1})
}

export const createdCard = async({title,status})=>{
    const position = await getNextPosition(status)

    const card = await Card.create({title,status,position})
    return card
}

export const updateCard = async(id,updates)=>{
    const card = await Card.findById(id)
    if(!card) return null;

    if(updates.title !==undefined){
        card.title=updates.title.trim()
    }

    if(updates.status !==undefined && updates.status !== card.status ){
        card.status = updates.status;
        card.position = updates.position !==undefined ? updates.position : await getNextPosition(updates.status);
    }else if(updates.position !==undefined){
        card.position = updates.position
    }

    card.version += 1;
    await card.save()
    return card
}

export const deleteCard = async(id)=>{
    return Card.findByIdAndDelete(id)
}