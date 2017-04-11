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

const APPID = "8c1e672e-cb8b-4e2a-8921-bc347c6c8a78";
const APPKEY = "2aJTBjCcjFecZqdSBfUUgYs";

 
// Create chat bot
var connector = new builder.ChatConnector({
    appId: APPID,
    appPassword: APPKEY
});
var bot = new builder.UniversalBot(connector);
;


var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/927a07ad-21ce-43f8-9044-776d720a5e8e?subscription-key=c5940b22af1c4c6ea4347c211b72036c&verbose=true&timezoneOffset=0.0&q='
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

