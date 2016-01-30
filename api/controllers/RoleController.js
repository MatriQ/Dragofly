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
		if (req.method='GET') {
			res.locals.role=newRole;
			return res.view();
		}
		else if (req.method='POST') {
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
		else{
			var newRole={
				Name:req.param('Name'),
				Desc:req.param('Desc'),
				Funcs:req.param('Funcs')
			};
			Role.update(id,newRole).exec(function(err,updated){
				if (err) {
					req.flash('message',err);
					return res.view();
				}
				return res.redirect('back');
			});
		}
	},
	delete:function(req,res){

	}
};
