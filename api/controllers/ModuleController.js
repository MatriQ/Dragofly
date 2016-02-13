/**
 * ModuleController
 *
 * @description :: Server-side logic for managing Modules
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		getAllModule:function(req,res){
			ModuleService.getModuleTree(function(navs){
				return res.json(navs);
			});
		},
		getChildModule:function(req,res){
			var parentId=parseInt(req.param('id'));
			Module.find({parent:parentId}).sort({sort:1}).then(function(navs){
				return res.json(navs);
			});
		},
		index:function(req,res){
			Module.find().sort({sort:1}).then(function(navs){
				res.locals.navlist=navs;
				res.locals.title="功能管理";
				return res.view();
			});
			/*.catch(function(err){
				req.flash('message',err);
				return res.view();
			});*/
		},
		new:function(req,res){
			var newNav={
				name:'',
		    icon:'',
		    tag:'',
		    desc:'',
		    sort:0
			};
			if (req.method=='GET') {
				res.locals.nav=newNav;
				res.locals.title="创建功能";
				return res.view();
			}
			else if (req.method=='POST') {
				newNav={
					name:req.param('name'),
					parent:req.param('parent'),
			    icon:req.param('icon'),
			    tag:req.param('tag'),
			    desc:req.param('desc'),
			    showInNav:req.param('showInNav'),
			    sort:parseInt(req.param('sort'))
				};
				sails.log(newNav);
				Module.create(newNav).then(function(ret){
					return res.redirect('back');
				}).catch(function(err){
					console.log(err);
					req.flash('message',err);
					return res.view();
				});
			}
		},
		edit:function(req,res){
			var id=req.param('id');
			res.locals.title="修改功能"
			if (req.method=='GET') {
				Module.findOne({id:id}).then(function(nav){
					res.locals.nav=nav;
					return res.view();
				}).catch(function(err){
					req.flash('message',err);
					return res.view();
				});
			}
			else if(req.method=='POST'){
				var newNav={
					name:req.param('name'),
					parent:req.param('parent'),
			    icon:req.param('icon'),
			    tag:req.param('tag'),
			    desc:req.param('desc'),
			    showInNav:req.param('showInNav'),
			    sort:parseInt(req.param('sort'))
				};
				Module.findOne({id:id}).then(function(nav){
					Module.update(id,newNav).then(function(nav){
						res.locals.nav=nav;
						return res.redirect('back');
					}).catch(function(err){
						req.flash('message',err);
						console.log(err);
						return res.view();
					});
				}).catch(function(err){
					req.flash('message',err);
					console.log(err);
					return res.view();
				});
			}
		}
};

function getPath(path,n){
	if(n.parent){
		path=n.parent.name+'→'+path
		return getPath(path,n.parent)
	}
	return path;
}
