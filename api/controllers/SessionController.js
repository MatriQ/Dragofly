/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

//var passwordHash = require('password-hash');

module.exports = {
	index:function(req,res){
		if (req.session.auth) {
			return res.redirect('/');
		}
		else{
			return res.view('session/index',{username:''});
		}
	},
	create:function(req,res){
		if (req.method=="GET") {
			return res.redirect('/login');
		}
		var username=req.param('username'),
			password=req.param('password');

		if (!username ) {
			//req.flash.message('login failed...','error');
			req.flash('message','no  username');
			return res.view('session/index',{
				username:''
			});
		}

		console.log('session#create:'+username+','+password);

		User.find({Name:username}).exec(function(err,users){
			if (users.length>>0==0 || err) {
				//req.flash.message('login failed...','error');
				req.flash('message','找不到用户');
				return res.view('session/index',{username:username});
			}

			var user=users[0];
			//console.log(user);
			if (password==user.pwd) {
				req.session.auth=true;
				req.session.User=user;
				console.log('login success.');
				return res.redirect('/');
			}
			else{
				//req.flash.message('login failed,password error...','error');
				req.flash('message','密码错误');
				return res.view('session/index',{username:username});
			}
		});
	},
	destroy:function(req,res){
		req.session.destroy();
		res.redirect("/login");
	}
};
