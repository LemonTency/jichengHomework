function route(handle,pathname,response,postData){
    console.log("About to route a request for "+pathname);
    if(typeof(handle[pathname]) === 'function'){
        return handle[pathname](response,postData);
    }else{
        console.log('no request handler for'+pathname);
        return "404 not found";
    }
}

exports.route = route