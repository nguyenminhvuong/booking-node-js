exports.createError = function(status, message){
    const newError = new Error();
    newError.status = status || 503;
    newError.message = message || "Something when wrong!";

    return newError;
}