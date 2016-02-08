/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res){
		res.locals.username=req.session.User.Name;
		Navigation.find().then(function(navs){
			res.locals.navs=navs;
			app.locals.navs=navs;
			return res.view();
		}).catch(function(err){
			req.flash('message',err);
			return res.view();
		});
		//return res.view();
	}
};
