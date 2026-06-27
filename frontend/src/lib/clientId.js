export const getClientId = ()=>{
    if(typeof window === 'undefined') return ''
    let id = sessionStorage.getItem('client-id')
    if(!id){
        id = crypto.randomUUID()
        sessionStorage.setItem('client-id',id)
    }
    return id
}