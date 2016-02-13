module.exports = {
  getModuleTree:function(callback){
    Module.find({parent:0}).sort({sort:1}).then(function(modules){
      var count=0;
      modules.forEach(function(m){
        m.level=0;
        m.path=m.name;
        getModule(m,function(){
          count++;
          if(count==modules.length){
            callback(modules);
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
      m.level=_module.level+1;
      m.path=_module.path+'→'+m.name;
      getModule(m,function(){
        count++;
        if(count==modules.length){
          callback();
        }
      });
    });
    if(modules.length==0){
      callback();
    }
  });
}
