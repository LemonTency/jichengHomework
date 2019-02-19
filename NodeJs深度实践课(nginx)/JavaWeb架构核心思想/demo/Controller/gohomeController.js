//BLL实现业务逻辑
var gohomeBLL = require('../BLL/gohomeBLL');
var gohomeController = function(restfyserver){
    this.server = restfyserver;
}

gohomeController.prototype.init = function(){
    var _server = this.server;
    _server.get('helloworld/:id',gohomeBLL.getItem());
    _server.get('add/:data',gohomeBLL.saveItem())
}

module.exports = gohomeController;