/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    account:'STRING',
    Name:'STRING',
    header:'string',
    mail:'string',
    pwd:'STRING',
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
