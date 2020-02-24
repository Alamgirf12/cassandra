
var  {ExpressCassandra,models} = require("./connection.js");

var Informat = models.loadSchema('Informat', {
    fields:{
        sid: {
            type: "uuid",
            default: {"$db_function": "uuid()"}
        },
        name    : "text",
        age     : "int",
        office  :"text",
        Country : "text",
        created : { type:"timestamp"}
    },
    key:["sid"]
});



Informat.syncDB(function(err, result) {
    if (err) throw err;    
});


module.exports = {ExpressCassandra,Informat,models};