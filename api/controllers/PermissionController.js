/**
 * PermissionController
 *
 * @description :: Server-side logic for managing Permissions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res){
		Permission.find().then(function(permissions){
			//console.log(users);
			return res.view({permissions:permissions});
		});
	},
};
