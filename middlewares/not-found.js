const notfound= (req,res)=>res.status(404).json({
    sucess:false,
    
    message:'Route Dosent Exist'
})

module.exports =notfound