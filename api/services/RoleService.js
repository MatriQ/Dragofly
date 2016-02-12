module.exports = {
  getAll:function(arg){
    return new Promise(function(resolve,reject){
      //console.log('start getConnection');
      Role.find(arg).then(function(err,roles){
        if (err) {
          //console.log(err);
          reject(err);
        }
        else{
          resolve(roles);
        }
      });
  });
}
}
