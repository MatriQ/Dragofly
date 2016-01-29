/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res){
		User.find().then(function(users){
			//console.log(users);
			return res.view({users:users});
		});
	},
	create:function(req,res){
		if (req.method=='GET') {
			return res.view();
		}
		var user={
			Name	:req.param('username'),
			pwd		:req.param('pwd'),
			superUser	:false
		};
		User.create(user).then(function(ret){
			req.flash('message','添加成功');
			return res.redirect('/user');
		},function(ret){
			req.flash('message','添加失败');
			res.locals.hr=req.body;
			return res.view();
		});
	},
	update:function(req,res){
		//res.locals.user
		var username=req.param('id');
		var reqUser={
			Name:req.param('user'),
			pwd:req.param('pwd')
		};
		if (req.method=='POST') {
			User.update({Name:reqUser.Name},reqUser).exec(function(err,updated){
				if (err || !updated) {
					req.flast('message',err);
					console.log(err);
				}
				User.findOne({Name:reqUser.Name}).then(function(err,user){
					res.locals.user=user;
					return res.view();
				}).catch(function(err){
					console.log(err);
				});
			});
		}
		else{
			if (!username) {
				return res.redirect('/user');
			}
			User.findOne({Name:username}).then(function(err,user){
				console.log('get:'+user);
				res.locals.user=user;
				return res.view();
			}).catch(function(err){
				console.log('error:'+err);
			});
		}
	},
	delete:function(req,res,next){
		console.log(req);
		var username=req.param('id');

		User.find({Name:username}).then(function(users){
			if (users.length>>0==0) {
				return res.redirect('back');
			}
			else if (users[0].isSuper===true) {
				req.flash('message','不能删除超级管理员');
				return res.redirect('back');
			}
			else{

					User.destroy({Name:username}).then(function(data){
						if (data) {
							req.flash('message',"删除成功");
						}
						else{
							req.flash('message',"删除失败");
						}
						console.log('delete user:'+data);
						return res.redirect('back');
					});
			}
		}).catch(function(err){
			console.log('delete user failed：'+err);
			return next(err);
		});
	}
};
