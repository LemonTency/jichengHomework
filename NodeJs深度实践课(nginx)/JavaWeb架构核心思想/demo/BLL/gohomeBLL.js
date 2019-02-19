/*BLL实现业务逻辑
与DAL连接
DAL处理与数据库通信
*/

var gohomeDAL = require('../DAL/gohomeDAL');
var gohomeBLL = gohomeBLL || {};

gohomeBLL = {
    getItem:function(){
        return function(req,res,next){
            var conditions = {};//查询条件，默认select *
            if(req.params.id){
                conditions.id = req.params.id;
            }
            gohomeDAL.getItem(conditions,function(err){
                
            })
        }
    },
    setItem:function(){
        return function(){

        }
    }
}
