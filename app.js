var restify = require('restify');
var builder = require('botbuilder');


//=========================================================
// Bot Setup
//=========================================================
 
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

const APPID = "df6f2d81-0842-453e-9348-f3f8c2117970";
const APPKEY = "FZ620n2AQpZ1K9a4H33fzZX";

 
// Create chat bot
var connector = new builder.ChatConnector({
    appId: APPID,
    appPassword: APPKEY
});
var bot = new builder.UniversalBot(connector);
;


var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/4c45a4f2-8d89-4756-878b-9f1660644d4a?subscription-key=c5940b22af1c4c6ea4347c211b72036c&verbose=true&timezoneOffset=0.0&q='
var recognizer = new builder.LuisRecognizer(model);
var intent = new builder.IntentDialog({ recognizers: [recognizer] });

server.post('/', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/' , intent);

intent.matches('ProductCost' ,

		[function (session, args, next) {

        // try extracting entities
        var productHeadPhone = builder.EntityRecognizer.findEntity(args.entities, 'Tai nghe');
		var productAdapter = builder.EntityRecognizer.findEntity(args.entities, 'Sạc');


			if (productHeadPhone) {
				session.dialogData.searchType = 'Tai nghe';
				next({ response: productHeadPhone.entity });
			}
			else if(productAdapter){
				session.dialogData.searchType = 'Sạc';
				next({ response: productAdapter.entity });
			}


},
	function (session, results) {
        var destination = results.response;

        var message = '';

        if ( session.dialogData.searchType === 'Tai nghe' ){
			 message += ' %s Samsung chính hãng giá : 70k';
		}

		else if ( session.dialogData.searchType === 'Sạc' ) {
			message += ' %s Samsung chính hãng giá : 150k';
		}

        session.send(message , destination);
	}
]);



intent.matches('Greetings' , function (session){
	session.send('Xin chào ! Tôi có thể giúp gì cho bạn ?');
});
intent.matches('Bye' , function (session){
	session.send('Tạm biệt, hẹn gặp lại !');
});
intent.matches('None' , function (session){
	session.send('Tôi tạm thời chưa hiểu !');
});

