

 function listener (res, userId) {
    
    
    return (noteId)=> {
       
       
            console.log("escuchada", noteId)
            res.write('event: message\n\n');
            res.write(`data: ${noteId}\n\n`);
        
      
    }
}


export default {
    
    listener
}