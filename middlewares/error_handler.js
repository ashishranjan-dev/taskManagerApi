const{CustomApiError}=require('../errors/custom_error')
const errorHandlerMiddleWare =(err,req,res,next)=>{

    if(err instanceof CustomApiError){
        return res.status(err.statuscode).json({
            sucess:false,
            message:err.message
        })
    }


    return res.status(500).json({msg:"Something went wrong "})
}

module.exports =errorHandlerMiddleWare