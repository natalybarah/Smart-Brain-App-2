const handleProfileGet= (req, resp)=>{
    const {id}=req.params;
    
    db.select('*').from('users').where({id})
    .then(user=>{
        if(user.length){
            resp.json(user[0]);
        }else{ 
            resp.status(400).json('Not found')}
        
})
.catch(err=> resp.status(400).json('error getting user') )
}

module.exports={
    handleProfileGet
}