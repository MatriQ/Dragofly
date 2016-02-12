/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res){
		User.find().populate('role').then(function(users){
			//console.log(users);
			return res.view({users:users});
		});

	},
	new:function(req,res){
		var user={account:'',pwd:'',isSuper:false};
		if (req.method=='GET') {
			res.locals.user=user;
			Role.find().then(function(datas){
				res.locals.roles=datas;
				return res.view();
			});
		}
		else{
			user={
				account	:req.param('account'),
				Name	:req.param('Name'),
				mail	:req.param('mail'),
				pwd		:req.param('pwd'),
				role:req.param('role'),
				isSuper	:false
			};
			User.create(user).then(function(ret){
				req.flash('message','添加成功');
				return res.redirect('/user');
			},function(ret){
				req.flash('message','添加失败');
				res.locals.hr=req.body;
				return res.view();
			});
		}
	},
	edit:function(req,res){
		//res.locals.user
		var id=req.param('id');
		var reqUser={
			id:id,
			account:req.param('account'),
			Name	:req.param('Name'),
			mail	:req.param('mail'),
			//pwd:req.param('pwd'),
			role:req.param('role')
		};
		if (req.method=='POST') {
			console.log(reqUser);
			User.update({id:id},reqUser).exec(function(err,user){
				if (err || !user) {
					req.flash('message',err);
					console.log(err);
				}
				res.locals.user=user;
				//console.log(user);
				return res.redirect('/user');
				/*User.findOne({id:id}).then(function(user){
					res.locals.user=user;
					console.log(user);
					return res.redirect('back');
				}*/
				}
			);
		}
		else{
			if (!id) {
				return res.redirect('/user');
			}
			User.findOne({id:id}).then(function(user){
				res.locals.user=user;
				Role.find().then(function(roles){
					res.locals.roles=roles;
					return res.view();
				});
			}).catch(function(err){
				console.log('error:'+err);
			});
		}
	},
	delete:function(req,res,next){
		//console.log(req);
		var id=req.param('id');

		User.findOne({id:id}).then(function(user){
			if (!user) {
				return res.redirect('back');
			}
			else if (user.isSuper===true) {
				req.flash('message','不能删除超级管理员');
				return res.redirect('/user');
			}
			else{

					User.destroy({id:id}).then(function(data){
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
