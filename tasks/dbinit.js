/**
 * to init database
 *
 *database User,Role,Function
 */

//create admin User
db.User.insert({
  "Name" : "admin",
	"pwd" : "1231",
	"isSuper" : true
})
