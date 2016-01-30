/**
 * FuncController
 *
 * @description :: Server-side logic for managing funcs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {



  /**
   * `FuncController.index()`
   */
  index: function (req, res) {
		Func.find().then(function(funcs){
			res.locals.funcs=funcs;
	    return res.view();
		}).catch(function(err){

			req.flash('message',err);
			res.locals.funcs=[];
			return res.view();
		});
  },


  /**
   * `FuncController.new()`
   */
  new: function (req, res) {
		var newFunc;
		if (req.method=='GET') {
			newFunc={
				name:'',
				desc:'',
				sort:'',
				code:''
			};
			res.locals.func=newFunc;
			return res.view();
		}
    else if (req.method=='POST') {
			newFunc={
				name:req.param('name'),
				desc:req.param('desc'),
				sort:parseInt(req.param('sort')),
				code:parseInt(req.param('code'))
			};
			Func.create(newFunc).then(function(ret){
				console.log(ret);
				if (ret) {
					return res.redirect('/func');
				}
			}).catch(function(err){
				console.log(err);
				return res.view();
			});
    }
  },


  /**
   * `FuncController.edit()`
   */
  edit: function (req, res) {
		var id=req.param('id');
    if (req.method=='GET') {
			Func.findOne(id).then(function(func){
				if (func) {
					res.locals.func=func;
				}
				res.view();
			}).catch(function(err){
				console.log(err);
				return res.view();
			});
    }
		else if (req.method=='POST') {
			var func={
				name:req.param('name'),
				desc:req.param('desc'),
				sort:parseInt(req.param('sort')),
				code:parseInt(req.param('code'))
			}
			Func.update(id,func).then(function(funcs){
				res.locals.func=funcs[0];
				return res.view();
			}).catch(function(err){
				console.log(err);
			});
		}
  },


  /**
   * `FuncController.delete()`
   */
  delete: function (req, res) {
		var id=req.param('id');
		Func.delete(id).then(function(ret){
			console.log(ret);
			return res.redirect('back');
		}).catch(function(err){
			console.log(err);
			return res.redirect('back');
		});
  }
};
