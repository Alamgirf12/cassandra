
var  {ExpressCassandra,models} = require("./connection.js");

// var Subscribe = models.loadSchema('Subscribe', {
//     fields:{
//         subid: type: "uuid",
           // default: {"$db_function": "uuid()"}
//         name    : "text",
//         web : "text",
//         created : {
//             type: "timestamp"
 
//         }
//     },
  
//      key : ["subid"]
// });
var Subscribe = models.loadSchema('Subscribe', {
    fields:{
        subid: {
       
       type: "uuid" },
        name    : "text",
        web : "text",
        created : {
            type: "timestamp"
             
        }
    },
     key : [["subid"],"created"],
   clustering_order: {"created": "desc"},
    
});




Subscribe.syncDB(function(err, result) {
    if (err) throw err;    
});


module.exports = {ExpressCassandra,Subscribe,models};