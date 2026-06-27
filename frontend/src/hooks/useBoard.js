'use client'

import * as api from '@/lib/api';
import { useCallback, useEffect, useState } from "react"

export const useBoard = ()=>{
    const [cards,setCards] = useState([])
    const [loading,setLoading] = useState(true)
    const [error,setError] = useState('')

    const loadCards = useCallback(async()=>{
        try {
            setError('')
            const data = await api.fetchCards()
            setCards(data)
        } catch (error) {
            setError(error.message)            
        }
        finally{
            setLoading(false)
        }
    },[])


    useEffect(()=>{
        loadCards()
    },[loadCards])

    const addCard = async(title,status)=>{
        const tempId = `temp-${Date.now()}`
        const optimistic = {
            id:tempId,
            title,
            status,
            position:cards.filter((c)=>c.status===status).length,
        }

        setCards((prev)=>[...prev,optimistic])

        try {
            const saved = await api.createCard(title,status)
            setCards((prev)=>prev.map((c)=>(c.id===tempId?saved:c)))
        } catch (error) {
            setCards((prev)=>prev.filter((c)=>c.id!==tempId))
            setError(error.message)
            
        }

    }

    const renameCard = async(id,title)=>{
        const prev=cards;
        setCards((c)=>c.map((card)=>(card.id===id?{...card,title}:card)))

        try {
            const updated = await api.updateCard(id,{title})
            setCards((c)=>c.map((card)=>(card.id===id?updated:card)))
        } catch (error) {
            setCards(prev)
            setError(error.message)
            
        }
    }

    const moveCard = async(id,status,position)=>{
        const prev=cards;
        setCards((c) => c.map((card) => (card.id === id ? { ...card, status, position } : card)))

        try {
            const updated = await api.updateCard(id,{status,position})
            setCards((c)=>c.map((card)=>(card.id===id?updated:card)))
        } catch (error) {
            setCards(prev)
            setError(error.message)            
        }
    }

    const removeCard = async(id)=>{
        const prev=cards;
        setCards((c)=>c.filter((card)=>card.id!==id))

        try {
            await api.deleteCard(id)
        } catch (error) {
            setCards(prev)
            setError(error.message)
            
        }
    }

    const syncCards = useCallback((newCards) => setCards(newCards), []);

    const applyCreated = useCallback((card) =>
        setCards((prev) => (prev.some((c) => c.id === card.id) ? prev : [...prev, card])), []);

    const applyUpdated = useCallback((card) =>
        setCards((prev) => prev.map((c) => (c.id === card.id ? card : c))), []);

    const applyDeleted = useCallback((id) =>
        setCards((prev) => prev.filter((c) => c.id !== id)), []);

    return{
        cards,loading,error,loadCards,addCard,renameCard,moveCard,removeCard,syncCards,applyCreated,applyUpdated,applyDeleted
    }

}