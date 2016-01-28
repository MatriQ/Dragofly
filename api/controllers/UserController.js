/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res){
		console.log("UserController#index");
		res.view('session/create',{error:'null'});
	},
	json:function(req,res){
		var msg={msg:'hello word',type:'1'/*,title:"haha"*/};
		res.json(msg);
	},
	get:function(req,res){
		res.send({
		  name: 'Loïc',
		  occupation: 'developer',
			description:'what is your name.'
		});
	},
	get1:function(req,res){
		res.send('get1');
	},
	add:function(req,res){

	},
	update:function(req,res){

	},
	delete:function(req,res){

	}
};
