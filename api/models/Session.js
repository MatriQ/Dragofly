/**
* Session.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    username:{
      type:'string',
      required:true,
      minLength:5,
      maxLength:10
    }
  },
  validationMessages:{
    username:{
      required:'用户名不能为空',
      minLength:'用户名长度不能小于5',
      maxLength:'用户名长度不能大于10'
    }
  }
};
