/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//var passwordHash = require('password-hash');

module.exports = {
	index:function(req,res){
		return res.view();
	},
	create:function(req,res){
		var username=req.param('username'),
			password=req.param('password');

		if (!username || !password) {
			//req.flash.message('login failed...','error');
			req.flash('message','no  username');
			return res.view('session/index',{
				error:'username and password can not be empty.'
			});
		}

		console.log('session#create:'+username+','+password);

		User.find({Name:username}).exec(function(err,user){
			if (user.length>>0==0 || err) {
				//req.flash.message('login failed...','error');
				req.session.flash={success:0,}
				req.flash('error',req.session.flash);
				return res.redirect('/login',{
					username:req.body.username
				});
			}
			//console.log(user);
			if (password==user.pwd) {
				req.session.auth=true;
				req.session.User=user;
				return res.redirect('/home');
			}
			else{
				//req.flash.message('login failed,password error...','error');
				return res.redirect('/login',{
					username:req.body.username
				});
			}
		});
	},
	destroy:function(req,res){
		req.session.destroy();
		res.redirect("signin");
	}
};
