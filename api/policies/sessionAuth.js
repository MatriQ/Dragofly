/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, next) {
  //console.log('sessionAuth:'+req.session.authenticated);
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  /*if (req.session.authenticated) {
    return next();
  }*/
  //console.log(req.options);
  if (req.session.auth) {
    res.locals.currUser=req.session.User;
    Module.find({parent:0,showInNav:true}).populate('children').sort({sort:1}).then(function(navs){
      console.log(navs);
			res.locals.navs=navs;
			//console.log(app.locals.navs);
			return next();
		}).catch(function(err){
			//req.flash('message',err);
			return next();
		});
    //return next();
  }
  else{
    return res.redirect('/login');
  }

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  //return res.forbidden('You are not permitted to perform this action.');
};
