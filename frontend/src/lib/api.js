import { getClientId } from '@/lib/clientId';
import { API_URL } from '@/lib/constants';

const request = async(path,options={})=>{
    const res = await fetch(`${API_URL}${path}`,{
        ...options,
        headers:{
            'Content-Type':'application/json',
            'x-client-id':getClientId(),
            ...options.headers,
        }
    })

    const data = await res.json().catch(()=>({}))

    if(!res.ok){
        throw new Error(data.message || 'Request failed')
    }
    return data;

}

export const fetchCards = ()=>request('/api/cards')

export const createCard = (title,status)=>
    request('/api/cards',{
        method:'POST',
        body:JSON.stringify({title,status}),
    })

export const updateCard = (id,updates)=>
    request(`/api/cards/${id}`,{
        method:'PATCH',
        body:JSON.stringify(updates)
    })  
    
export const deleteCard = (id)=>
    request(`/api/cards/${id}`,{method:'DELETE'})    