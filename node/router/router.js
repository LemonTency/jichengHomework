function route(pathname,response) {
    console.log("About to route a request for " + pathname);
    if(pathname == '/'){
        
    }else if(pathname == '/index/home'){
        response.end('hello');
    }
  }
   
  exports.route = route;