/**
 * RoleController
 *
 * @description :: Server-side logic for managing roles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res){
		var roles=Role.find().then(function(roles){
			res.locals.roles=roles;
			res.view();
		});
	},
	new:function(req,res){
		var newRole={
			Name:'',
			Desc:'',
			Func:''
		}
		if (req.method=='GET') {
			res.locals.role=newRole;
			return res.view();
		}
		else if (req.method=='POST') {
			newRole={
				Name:req.param('Name'),
				Desc:req.param('Desc'),
				Func:''
			};
			Role.create(newRole).then(function(ret){
				if (ret) {
					return res.redirect('/role');
				}
				else{
					return res.ok();
				}
			});
		}
	},
	edit:function(req,res){
		var id=req.param('id');
		if (req.method=='GET') {
			Role.findOne({id:id}).then(function(role){
				if (!role) {
					return res.redirect('/role');
				}
				else{
					res.locals.role=role;
					return res.view();
				}
			});
		}
		else if (req.method=='POST'){
			var newRole={
				Name:req.param('Name'),
				Desc:req.param('Desc'),
				Funcs:req.param('Funcs')
			};
			Role.update({id:id},newRole).exec(function(err,role){
				if (err) {
					req.flash('message',err);
					console.log(err);
					return res.view();
				}
				return res.redirect('back');
			});
		}
	},
	delete:function(req,res){
		var id=req.param('id');

		Role.findOne({id:id}).then(function(role){
			if (!role) {
				return res.redirect('back');
			}
			else if (role.Name==='admin') {
				req.flash('message','不能删除超级管理员');
				return res.redirect('back');
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
