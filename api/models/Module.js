/**
* Navigation.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name:{
      type:'string',
      required: true
    },
    icon:'STRING',
    address:{
      type:'string',
      defaultsTo:'#'
    },
    tag:'STRING',
    desc:'STRING',
    showInNav:{
      type:'boolean',
      defaultsTo:false
    },
    sort:
    {
      type:'integer',
      defaultsTo:0
    },
    parent:
    {
      model:'module'
    },
    children:
    {
      collection: 'module',
      via: 'parent'
    }
  }
};
