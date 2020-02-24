var express = require('express');
var router = express.Router();
var _ = require('lodash');
var moment = require('moment');
var {Informat,ExpressCassandra,models} = require('../Informat'); 
var {Subscribe,ExpressCassandra,models} = require('../Subscribe'); 

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//add data 
					router.get('/add', function(req, res, next) {
					  res.render('add', { add: 'Add New' });
					});
					router.post('/post', function(req, res) {	 
							var name = req.body.name;
							var age = parseInt(req.body.age);
							var office = req.body.office
									 
							var Country = req.body.Country;
							var created = Date('yyyy-mm-dd');
							
							var data = new models.instance.Informat({name,age,office,Country,created});		 
						data.save(function(err){
					    if(err) console.log(err);
					    else console.log('Yahoo Done!');

						res.redirect('/');	
					});
					});
//view data
			router.get('/view', function(req, res, next) {

				models.instance.Informat.find({}, function(err,people) {
					res.render('view',
						{people:people,
						view: 'View Data'});// body...
				});

			});


router.get('/edit/:sid', function(req, res) {	 	
	var sidss = models.uuidFromString(req.params.sid);
	// var query_object = {col_id:col};	 
	models.instance.Informat.findOne({sid:sidss}, function(err, people){     			 	
	res.render('edit', { people: people,
		add:'edit'});
	});	 
});

router.post('/update/:id', function(req, res) {	 
							var name = req.body.name;
							var age = parseInt(req.body.age);
							var office = req.body.office
									 
							var Country = req.body.Country;
							var created = Date();
							var col = models.uuidFromString(req.params.id);
 
	
	 
	models.instance.Informat.update({sid:col},{name,age,office,Country,created}) 	     
	res.redirect('/view');
});
//delete
router.get('/delete/:did',function(req,res,next){
	var idss = models.uuidFromString(req.params.did);
	models.instance.Informat.delete({sid:idss},function(err){
if(err) throw err;

	});
	res.redirect('/view');
});


//subscriber
router.get('/addsub', function(req, res, next) {
  res.render('addsub', { add: 'Add New Subscriber' });
});
router.post('/postsubscriber', function(req, res) {	 
		var subid = models.uuid();
		var name = req.body.name;

		var web = req.body.web
	
	   var created = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
		
		var data = new models.instance.Subscribe({subid, name, web,created});		 
	data.save(function(err){
    if(err) throw err;

	res.redirect('/sview');	
});
});



router.get('/sview', function(req, res, next) {
// 	var query = {
  
//     clustering_order: { '$desc' :'created' }
// };
	 // models.instance.Subscribe.find({subid: {'$lt': models.uuidFromString('dc721d55-2b3a-4bb9-a8fb-244e72cd175b')}, $limit:3}, function(err,subs) {

	 models.instance.Subscribe.find({}, function(err,subs) {
		if(err) console.log(err);
		res.render('sview', {
			moment:moment,
			subs: _.orderBy(subs, ["created"], ['asc']),
			view: 'View Subscriber'
		});

	});	
});
router.get('/sedit/:subid',function(req,res,next){
	var id = models.uuidFromString(req.params.subid);
models.instance.Subscribe.findOne({subid:id}, function(err, subss){  
		res.render('sedit',{subs:subss,
			edit:'Edit'});
	});

});

//subscieber end
router.post('/supdate/:s', function(req, res, next) {
	var name = req.body.name;
	var web = req.body.web;
	var  sid = models.uuidFromString(req.params.s);
	
 	var created = Date();

 	
	 
	models.instance.Subscribe.update({subid:sid},{name,web,created}, function(err){

	});	     
	res.redirect('/sview');
 });

router.get('/sdelete/:dd',(req,res)=>{
	var id = models.uuidFromString(req.params.dd);
	models.instance.Subscribe.delete({subid:id},function(err){
		if(err) throw err;
		
	});
res.redirect('/sview');
})
module.exports = router;
