module.exports = {
	before:function(callback,req,resp){
		console.log(":D");
		callback();
	},
	after:function(callback,req,resp){

	}
};