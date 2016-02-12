/**
* Role.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    Name:{
      type:'string',
      unique: true,
      required: true
    },
    Desc:{
      type:'string',
      defaultsTo:''
    },
    Enable:{
      type:'boolean',
      defaultsTo:true
    },
    users:{
      collection:'user',
      via:'role'
    },
    toJSON:function(){
      var obj=this.toObject();
      delete obj.createdAt;
      delete obj.updatedAt;
      return obj;
    }
  }
};
