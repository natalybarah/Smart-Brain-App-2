const handleImage= (req, resp, db)=>{
    const {id}=req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)//we increment by one
    .returning('entries')
    .then(entries=>{
        resp.json(entries[0].entries);
    })
    .catch(err=>resp.status(400).json('unable to get count of entries'))
}
module.exports={
    handleImage
}