export const serializeCard=(doc)=>{
    if(!doc) return null;

    const obj = doc.toObject? doc.toObject():doc;
    return{
        id:obj._id.toString(),
        title:obj.title,
        status:obj.status,
        position:obj.position,
        version:obj.version,
        createdAt:obj.createdAt,
        updatedAt:obj.updatedAt
    }
}