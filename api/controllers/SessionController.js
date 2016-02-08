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
			//return res.view('session/index',{username:''});
			return res.render("session/index",{username:''});
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
			req.flash('error','请输入账号');
			return res.render('session/index',{
				username:''
			});
		}
		else if (!password) {
			req.flash('error','请输入密码');
			return res.render('session/index',{
				username:username
			});
		}

		console.log('session#create:'+username+','+password);

		User.findOne({Name:username}).exec(function(err,user){
			if (!user || err) {
				//req.flash.message('login failed...','error');
				req.flash('error','找不到用户');
				return res.render('session/index',{username:username});
			}

			//console.log(user);
			if (password==user.pwd) {
				req.session.auth=true;
				req.session.User=user;
				console.log('login success.');
				return res.redirect('/');
			}
			else{
				//req.flash.message('login failed,password error...','error');
				req.flash('error','密码错误');
				return res.render('session/index',{username:username});
			}
		});
	},
	destroy:function(req,res){
		console.log('logout success');
		req.session.destroy();
		res.redirect("/login");
	}
};
