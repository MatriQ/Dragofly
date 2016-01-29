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
		var id=BSON.ObjectID.createFromHexString(req.param('id'));
		var newRole={
			Name:req.param('name'),
			Desc:req.param('desc'),
			Func:''
		}
		if (req.method='GET') {
			res.locals.role=newRole;
			res.view();
		}
		else if (req.method='POST') {
			Role.update({_id:id},newRole).exec(function(err,updated){
				if (err) {
					req.flash('message',err);
					return res.view();
				}
				return res.redirect('back');
			});
		}
	},
	update:function(req,res){

		/*else{
			Role.findOne({_id:id}).then(function(role){
				res.locals.role=role;
				return res.redirect('back');
			}).catch(function(err){
				console.log(err);
			});
		}*/
	},
	delete:function(req,res){

	}
};
