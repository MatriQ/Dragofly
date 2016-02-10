/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    account:{
      type:'string',
      unique: true,
      required: true
    },
    Name:{
      type:'string',
      unique: true,
      required: true
    },
    header:'string',
    mail:{
      type:'string',
      unique: true
    },
    pwd:
    {
      type:'string',
      required: true
    },
    lastlogintime:'time',
    isSuper:{
      type:'boolean',
      defaultsTo:false
    },
    depart:'STRING',
    role:{
      model:'role'
    }
  }
};
