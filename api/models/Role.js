/**
* Role.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    Name:'STRING',
    Desc:'STRING',
    users:{
      collections:'user',
      via:'users'
  }
  }
};