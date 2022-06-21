class CustomApiError extends Error{
    constructor(message,statuscode){
        super(message)
        this.statuscode=statuscode

    }
   
}

const CustomError=(msg,statuscode)=>{
    return new CustomApiError(msg,statuscode)
}

module.exports = {CustomError,CustomApiError}


