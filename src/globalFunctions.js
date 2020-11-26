export const globalFunctions = {
    errorResponse: function(error){
        if(error.response.status === 401){
            window.location.href = '/login/'
        }
        if (error.response) {
            let message = ''
            for (let errorMessage in error.response.data){
                if(errorMessage === 'error'){
                    message+= `${error.response.data[errorMessage]}`
                }
                else{
                    message+= `${errorMessage}: ${error.response.data[errorMessage][0]}`
                }
            }               
            return message
        } else if (error.request) {
            return `Sorry, the following error occured (${error.request}).`
        } else {                
            return `Sorry, the following error occured (${error.message}).`
        }
    }
}