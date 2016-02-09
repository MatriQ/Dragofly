/**
 * NavigationController
 *
 * @description :: Server-side logic for managing navigations
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
		index:function(req,res){
			Navigation.find().then(function(navs){
				res.locals.navlist=navs;
				res.locals.title="导航管理";
				return res.view();
			}).catch(function(err){
				req.flash('message',err);
				return res.view();
			});
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
				res.locals.title="创建导航";
				return res.view();
			}
			else if (req.method=='POST') {
				newNav={
					name:req.param('name'),
			    icon:req.param('icon'),
			    tag:req.param('tag'),
			    desc:req.param('desc'),
			    sort:parseInt(req.param('sort'))
				};
				Navigation.create(newNav).then(function(ret){
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
			res.locals.title="修改导航"
			Navigation.findOne({id:id}).then(function(nav){
				res.locals.nav=nav;
				return res.view();
			}).catch(function(err){
				req.flash('message',err);
				return res.view();
			});
		}
};
