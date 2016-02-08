/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res){

		res.locals.title="管理首页";
		return res.view();

		/*Navigation.find().then(function(navs){
			res.locals.navs=navs;
		}).catch(function(err){
			req.flash('message',err);
			return res.view();
		});*/
	}
};
