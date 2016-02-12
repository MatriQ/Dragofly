module.exports = {
  getModuleTree:function(callback){
    Module.find({parent:0}).sort({sort:1}).then(function(modules){
      var count=0;
      modules.forEach(function(m){
        //m.children=[];
        m.level=0;
        //console.log("get "+m.name+" children");
        getModule(m,function(){
          count++;
          //console.log("count:"+count);
          //console.log("modules.length:"+modules.length);
          if(count==modules.length){
            callback(modules);
            //console.log(modules);
          }
        });
      });

      if(modules.length==0){
        callback();
      }
    });
  }
}

function  getModule(_module,callback){
  Module.find({parent:_module.id}).sort({sort:1}).then(function(modules){
    var count=0;
    modules.forEach(function(m){
      _module.children.push(m);

      //console.log(_module.name+"add child "+m.name);
      //m.children=[];
      m.level=_module.level+1;
      //console.log("get "+m.name+" children");
      getModule(m,function(){
        count++;
        if(count==modules.length){
          //callback(modules);
          callback();
        }
      });
    });
    if(modules.length==0){
      callback();
    }
    //console.log(_module);
  });
}
