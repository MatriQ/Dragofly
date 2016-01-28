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

	},
	delete:function(req,res,next){
		console.log(req);
		var username=req.param('id');
			console.log('user#delete:'+req.method+','+username);
		User.destroy({Name:username}).then(function(data){
			if (data) {
				req.flash('message',"删除成功");
			}
			else{
				req.flash('message',"删除失败");
			}
			console.log('delete user:'+data);
			return res.redirect('back');
		},function(err){
			console.log('delete user failed');
			return next(err);
		});
	}
};
