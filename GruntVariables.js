var _ = require ("lodash");
 
var files1 = {
    var1: ["one"]
};
 
var all = [];
all.push("two");
all.push(files1.var1);
 
 
var files2 = {
	var2 : all
};

var global = _.extend(files1, files2, {
    openPath : "http://localhost:9000"
});
module.exports = global;